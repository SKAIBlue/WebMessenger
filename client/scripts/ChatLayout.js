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
    var chat = Chat.find({chatRoomId:selectedChatRoom});
    var result = [];
    chat.forEach(function(item){
        var user = UserAddition.findOne({userId:item.chatUserId});
        var profile = user.profile.length == 0 ? PROFILE_DEFAULT_PATH : user.profile;
        var nickName = user.nickName.length == 0 ? user.email : user.nickName;
        var time = dateFormat(item.chatTime);
        result.push({
            chatWho:nickName,
            chatProfile:profile,
            chatText:item.chatText,
            chatTime:time,
            isYou(){
                return Meteor.userId() != item.chatUserId;
            },
            position(){
                return (this.isYou()) ? "you":"me";
            }
        });
    });
    return result;
}

function sendMessage(message)
{
    if(message.length == 0)
    {
        return;
    }
    var selectedChatRoom = Session.get(SESSION_SELECTED_CHAT_ROOM);
    if(selectedChatRoom.length == 0)
    {
        console.log("not select chat room");
        return;
    }

    Chat.insert({
        chatUserId: Session.get(SESSION_USER_ID),
        chatRoomId: selectedChatRoom,
        chatText:message,
        chatTime:new Date(),
        isFile:false,
    });
}

Template.ChatLayout.onCreated(function(){
    Uploader.init(this);
});

Template.ChatLayout.rendered = function()
{
    Uploader.render.call(this);
}

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
        console.log("click!");
        $('#chat-send-file').click();
        Uploader.startUpload.call(Template.instance(), event);
    }
});

