/**
 * Created by Anonymous on 2016. 6. 13..
 */
Template.AddFriend.events({
    'click .add-friend-box'(e)
    {
        AddFriend(this.friendId);
    }
});

AddFriend = function(id)
{
    var _id = UserAddition.findOne({userId:Meteor.userId()})._id;
    UserAddition.update(_id, {$push:{friends:id}});
}