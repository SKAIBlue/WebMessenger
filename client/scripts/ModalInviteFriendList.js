/**
 * Created by Anonymous on 2016. 6. 14..
 * This script for invite new friend in chat room.
 */

function MyFriendList(keyword)
{
    var nowChatRoom = Session.get(SESSION_SELECTED_CHAT_ROOM);
    var list = ChatRoom.findOne(nowChatRoom).whoIn;
    var notInFriends = UserAddition.find({userId:{$nin:list}});
    var results = [];
    var regEx = keyword + ".*";
    notInFriends.forEach(function(item){
        if(item.nickName.match(regEx) || item.email.match(regEx))
        {
            var name = ( item.nickName.length == 0 ) ? item.email:item.nickName ;
            var image = (item.profile.length == 0 ) ? PROFILE_DEFAULT_PATH : item.profile;
            results.push({
                friendId:item.userId,
                friend_name:name,
                friend_image:image
            });
        }
    });
    return results;
}

Template.ModalInviteFriendList.onCreated(function(){
    Session.setDefault(SESSION_SEARCH_INVITE_FRIEND, "");
    Session.set(SESSION_SEARCH_INVITE_FRIEND, "");
});

Template.ModalInviteFriendList.helpers({
    myfriend_list()
    {
        return MyFriendList(Session.get(SESSION_SEARCH_INVITE_FRIEND));
    }
});

Template.ModalInviteFriendList.events({
    'keyup .search-invite-friend-form'(e)
    {
        Session.set(SESSION_SEARCH_INVITE_FRIEND ,e.target.value);
    }
});

Template.InviteFriendList.events({
    'click .invite-friend-box'(e)
    {
        Meteor.call('ChatRoom.invite',Session.get(SESSION_SELECTED_CHAT_ROOM),this.friendId);
        $('#invite-friend').closeModal();
    }
});

