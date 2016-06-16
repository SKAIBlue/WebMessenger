/**
 * Created by Anonymous on 2016. 6. 3..
 */

Template.FriendList.events({
   'click .friend-list-box'(e){
       CreateChatRoom(this.friendId);
       Materialize.toast("새로운 채팅방이 만들어 졌습니다.",3000);
   }
});

CreateChatRoom = function(id){
    var userId = Session.get(SESSION_USER_ID);
    var myAddition = UserAddition.findOne(userId);
    var friendAddition = UserAddition.findOne({userId:id});
    var chatRoomId = ChatRoom.insert({
        whoIn:[ userId, id ],
        chatRoomName:"",
        chatRoomImage:""
    });
    UserAddition.update(myAddition._id, {$push:{chatRoomList:chatRoomId}});
    UserAddition.update(friendAddition._id, {$push:{chatRoomList:chatRoomId}});
}