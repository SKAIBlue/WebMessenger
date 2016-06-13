/**
 * Created by Anonymous on 2016. 4. 30..
 */


Meteor.publish('UserAddition', function UserAdditionPublication() {
    return UserAddition.find();
});

Meteor.publish('ChatRoom', function ChatRoomPublication(){
    return ChatRoom.find();
});

Meteor.publish('Chat', function ChatPublication(){
    return Chat.find();
});