/**
 * Created by Anonymous on 2016. 4. 30..
 */


Meteor.publish('UserAddition', function UserAdditionPublication() {
    return UserAddition.findAll();
});

Meteor.publish('ChatRoom', function ChatRoomPublication(){
    return ChatRoom.findAll();
});

Meteor.publish('Chat', function ChatPublication(){
    return Chat.findAll();
});