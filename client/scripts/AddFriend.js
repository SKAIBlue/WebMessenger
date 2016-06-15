/**
 * Created by Anonymous on 2016. 6. 13..
 */
Template.AddFriend.events({
    'click .add-friend-box'(e)
    {
        Meteor.call('UserAddition.AddFriend', this.friendId);
        Materialize.toast("친구 추가 성공",3000);
        $('#add-friend').closeModal();
    }
});
