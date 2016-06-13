/**
 * Created by Anonymous on 2016. 6. 13..
 */
Template.NoneSelectChatRoom.helpers({
   helpText(){
       var MyAddition = UserAddition.findOne({userId:Meteor.userId()});
       if(MyAddition.chatRoomList.length != 0 && MyAddition.friends.length == 0)
       {
           return "상단의 얼굴 아이콘을 눌러 친구를 추가 할 수 있습니다. 왼쪽의 채팅방을 눌러 채팅을 시작하세요"
       }
       else if(MyAddition.friends.length == 0 )
       {
           return "상단의 얼굴 아이콘을 눌러 친구를 추가 해 주세요";
       }
       else if(MyAddition.chatRoomList.length == 0)
       {
           return "상단의 + 아이콘을 눌러 채팅방을 추가하세요";
       }
       return "왼쪽의 채팅방을 눌러 채팅을 시작하세요";
   }
});