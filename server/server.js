/**
 * Created by Anonymous on 2016. 4. 30..
 */

Meteor.publish('UserAddition', function UserAdditionPublication() {
    return UserAddition.find();
});

Meteor.publish('ChatRoom', function ChatRoomPublication(){
    if(this.userId)
    {
        var list = UserAddition.findOne({userId:this.userId}).chatRoomList;
        return ChatRoom.find({_id:{$in:list}});
    }
    return[];
});

Meteor.publish('Chat', function ChatPublication(){
    if(this.userId)
    {
        var list = UserAddition.findOne({userId:this.userId}).chatRoomList;
        return Chat.find({chatRoomId:{$in:list}});
    }
    return[];
});