/**
 * Created by Anonymous on 2016. 6. 13..
 */

function dateFormat(date)
{
    var now = new Date();
    if(now.getYear() != date.getYear())
    {
        return date.getYear() + "년 " + ( date.getMonth() + 1) +"월 " + date.getDate() + "일 " + date.getHours() + ":" + date.getMinutes();
    }
    if(now.getMonth() == date.getMonth() && now.getDate() == date.getDate())
    {
        return date.getHours() + "시 " + date.getMinutes() + "분";
    }
    return (date.getMonth() + 1) +"월 " + date.getDate() + "일 " + date.getHours() + ":" + date.getMinutes();
}

function getChatList(selectedChatRoom)
{
    Meteor.subscribe('Chat');
    var chat = Chat.find({chatRoomId:selectedChatRoom}, {sort: {chatTime:-1}, limit: Session.get(SESSION_CHAT_COUNT) });
    var result = [];
    chat.forEach(function(item){
        var user = UserAddition.find({userId:item.chatUserId}).fetch()[0];
        var profile = user.profile.length == 0 ? PROFILE_DEFAULT_PATH : user.profile;
        var nickName = user.nickName.length == 0 ? user.email : user.nickName;
        var time = dateFormat(item.chatTime);
        var text ="";
        if(item.isFile)
        {
            if(item.isImage)
            {
                text = item.chatText;
            }
            else
            {
                text = "img/file_icon.png";
            }
        }
        else if(item.isInvite)
        {
            //console.log("is invite");
            var invitedUser = UserAddition.findOne({userId:item.chatText});
            text = invitedUser.nickName.length == 0 ? invitedUser.email : invitedUser.nickName;
            //console.log(invitedUser);
        }
        else
        {
            text = item.chatText;
        }

        //console.log(item.isInvite);
        var userId = Session.get(SESSION_USER_ID);
        result.push({
            chatWho:nickName,
            chatProfile:profile,
            chatText:text,
            chatTime:time,
            isFile:item.isFile,
            isImage:item.isImage,
            chatFilePath:item.chatText,
            isInvite : item.isInvite,
            isYou(){
                return userId != item.chatUserId;
            },
            position(){
                return (this.isYou()) ? "you":"me";
            }
        });
    });
    result.reverse();
    return result;
}

function sendMessage(message)
{
    if(message.length == 0)
    {
        return;
    }
    var selectedChatRoom = Session.get(SESSION_SELECTED_CHAT_ROOM);

    Chat.insert({
        chatUserId: Session.get(SESSION_USER_ID),
        chatRoomId: selectedChatRoom,
        chatText:message,
        chatTime:new Date(),
        isFile:false,
        isImage:false
    });
    Session.set(SESSION_CHAT_COUNT, Session.get(SESSION_CHAT_COUNT) + 1);
}

Template.ChatLayout.onCreated(function(){
    Uploader.init(this);
});

Template.ChatLayout.rendered = function()
{
    Uploader.render.call(this);
};

Template.ChatLayout.helpers({
    chat_list(){
        return getChatList(Session.get(SESSION_SELECTED_CHAT_ROOM));
    }
});

Template.ChatLayout.events({
    'submit .input-form'(event)
    {
        event.preventDefault();
        var target = event.target;
        var text = target.text.value;
        sendMessage(text);
        target.text.value = "";
    },
    'click .send-button-form'()
    {
        var input = document.getElementById('input-message');
        var text = input.value;
        sendMessage(text);
        input.value = "";
    },
    'click #send-file-button-form'(){
        //console.log("click!");
        $('#chat-send-file').click();
        Session.set(SESSION_UPLOAD_SELECTOR, UPLOAD_FILE);
    },
    'click #send-file-button'()
    {
        Uploader.startUpload.call(Template.instance(), event);
        Session.set(SESSION_CHAT_COUNT, Session.get(SESSION_CHAT_COUNT) + 1);
    }

});

