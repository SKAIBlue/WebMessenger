/**
 * Created by Anonymous on 2016. 6. 3..
 */

Template.FriendList.events({
   'click friend-box'(){
       console.log("friend click");
   }
});

Template.FriendList.helpers({
    friend_list()
    {
        return [{
            friend_name : "김태훈",
            friend_img : "img/default_profile.png"
        }];
    }
})