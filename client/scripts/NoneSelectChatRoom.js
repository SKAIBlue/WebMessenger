/**
 * Created by Anonymous on 2016. 6. 13..
 */
Template.NoneSelectChatRoom.helpers({
   helpText(){
       var MyAddition = UserAddition.findOne({userId: Session.get(SESSION_USER_ID)});
       if (MyAddition) {
           //console.dir(MyAddition);
           if (MyAddition.chatRoomList.length == 0 && MyAddition.friends.length == 0) {
               $('#helpText').append("<div id='helpTextArea'>반갑습니다!</br><i class='medium material-icons'>face</i> 를 눌러 친구를 추가한후" +
                   "</br><i class='medium material-icons'>add</i>를 눌러 추가된 친구와 대화를 시작하세요!</div>");
               return;
           }
           else if (MyAddition.friends.length == 0) {
               $('#helpTextArea').remove();
               $('#helpText').append("<div id='helpTextArea'><i class='medium material-icons'>face</i> 를 눌러서 친구를 추가하세요</div>");
               return;
           }
           else if (MyAddition.chatRoomList.length == 0) {
               $('#helpTextArea').remove();
               $('#helpText').append("<div id='helpTextArea'><i class='medium material-icons'>add</i> 를 눌러서 대화를 시작하세요</div>");
               return;
           }
           $('#helpText').append("반갑습니다!");
           return;
       }
       //console.log("NoneSelectChatRoom help text: MyAddition is undefined");
   }
});