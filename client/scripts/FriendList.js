/**
 * Created by Anonymous on 2016. 6. 3..
 */

Template.FriendList.events({
   'click friend-box'(){
       console.log("friend click");
   }
});

Template.FriendList.helpers({

});

Template.ModalInviteFriendList.helpers({
    myfriend_list()
    {
        return [{
            friend_name : "김태훈",            //나의 친구 목록 중 이름
            friend_img : "img/default_profile.png" // 프로필
        }];
    }
});