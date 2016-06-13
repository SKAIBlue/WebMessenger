/**
 * Created by Anonymous on 2016. 6. 13..
 */

function getChatList(selectedChatRoom)
{
    var chat = Chat.find({roomId:selectedChatRoom});
    return chat;
    var result = [];
    console.log("getChatList");
    chat.forEach(c)
    {
        result.push({
            chatWho:c.chatWho,
            chatProfile:c.chatProfile,
            chatText:c.chatText,
            chatTime:c.chatTime,
            isMy(){
                return Meteor.userId == c.chatWho;
            },
            position(){
                return (this.isMy()) ? "me":"you";
            }
        });
    }
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
    // 채팅 내용 저장
    Chat.insert({
        chatUserId: Session.get(SESSION_USER_ID),
        chatRoomId: selectedChatRoom,
        chatText:message,
        chatTime:new Date(),
        isFile:false
    });

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
});

