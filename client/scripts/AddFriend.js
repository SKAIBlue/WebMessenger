/**
 * Created by Anonymous on 2016. 6. 13..
 */
Template.AddFriend.events({
    'click .add-friend-box'(e)
    {
        Meteor.call('UserAddition.AddFriend', this.friendId);
        $('#add-friend').closeModal();
    }
});
