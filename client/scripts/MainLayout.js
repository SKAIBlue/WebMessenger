/**
 * Created by kth on 16. 5. 23.
 */
import { Template } from 'meteor/templating';
/**
 * 친구 목록을 가져옵니다
 * @returns {Array}
 * @constructor
 */
function FriendList()
{
    var myAddition = UserAddition.findOne({userId:Meteor.userId()});
    var friendIds = myAddition.friends;
    var result = [];
    for(var i = 0 ; i < friendIds.length ; ++i )
    {
        var id = friendIds[i];
        var friend = UserAddition.findOne({userId:id});
        var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
        var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
        result.push({
            friendId:id,
            friend_name:nickName,
            friend_img:profile
        });
    }
    return result;
}
/**
 * 친구를 검색합니다
 * @param email email
 * @returns {Array} 사용자 배열
 * @constructor
 */
function SearchFriend( email )
{
    if(email.length == 0)
    {
        return;
    }
    var regEx =  email + '.*';
    var results = [];
    var users = UserAddition.find({email:{$regex:regEx}});
    var myAddition = UserAddition.findOne({userId:Meteor.userId()});
    users.forEach(function(user){
        if(myAddition.friends.indexOf(user.userId) > -1 || user.userId == Meteor.userId())
        {
            return;
        }
        var friend = UserAddition.findOne({userId:user.userId});
        var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
        var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
        results.push({
            friendId:user.userId,
            nickName:nickName,
            Profile:profile,
            email:friend.email
        });
    });
    return results;
}

/**
 * 방 목록을 만듭니다
 * @param roomId
 * @returns {*}
 */
function buildRoomName(roomId)
{
    var chatRoom = ChatRoom.findOne({_id:roomId});
    var whoIn = chatRoom.whoIn;

    if(whoIn.length== 1)
    {
        // 혼자 있는 경우
        return "대화 상대 없음";
    }
    else if(chatRoom.chatRoomName.length == 0)
    {
        // 방 제목을 설정하지 않은 경우
        if(whoIn.length == 2)
        {
            if(whoIn[0] == Session.get(SESSION_USER_ID))
            {
                var friend = UserAddition.findOne({userId:whoIn[1]});
                var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
                return  nickName + " 님과의 대화"
             }
            else
            {
                var friend = UserAddition.findOne({userId:whoIn[0]});
                var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
                return nickName + " 님과의 대화"
            }
        }
        else
        {
            return "제목 없는 그룹 대화";
        }
    }
    return chatRoom.chatRoomName;
}

function getRoomImage(roomId)
{
    var chatRoom = ChatRoom.findOne({_id:roomId});
    var whoIn = chatRoom.whoIn;

    if(whoIn.length== 1)
    {
        // 혼자 있는 경우
        return PROFILE_DEFAULT_PATH;
    }
    else if(chatRoom.chatRoomImage.length == 0)
    {
        // 방 프로필을 설정하지 않은 경우
        if(whoIn.length == 2)
        {
            if(whoIn[0] == Session.get(SESSION_USER_ID))
            {
                var friend = UserAddition.findOne({userId:whoIn[1]});
                var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
                return  profile;
            }
            else
            {
                var friend = UserAddition.findOne({userId:whoIn[0]});
                var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
                return  profile;
            }
        }
        else
        {
            return PROFILE_DEFAULT_PATH;
        }
    }
    return chatRoom.chatRoomImage;
}

function getChatRoomList()
{
    var addition = UserAddition.findOne({userId:Session.get(SESSION_USER_ID)});
    var myChatRoom = addition.chatRoomList;
    var chatRoom = [];
    for(var i = 0 ; i < myChatRoom.length ; ++i)
    {
        //var roomName = buildRoomName(roomId);
        //TODO: 방 제목 비교 처리
        var roomId = myChatRoom[i];
        ChatRoom.findOne(roomId);
        chatRoom.push({
            roomId: roomId,
            chatRoomName:buildRoomName(roomId),
            chatRoomImage:getRoomImage(roomId)
        });
    }
    return chatRoom;
}

Template.MainLayout.onCreated(function MainLayoutOnCreated()
{
    // 구독
    Meteor.subscribe('UserAddition');
    Meteor.subscribe('ChatRoom');
    Meteor.subscribe('Chat');
    // 데이터베이스에 생성된 추가 데이터가 있는지 검사
    Session.setDefault(SESSION_SELECTED_CHAT_ROOM,"");
    Session.set(SESSION_SEARCH_KEY_WORD, "");
    Meteor.call("UserAddition.findOne",Meteor.userId(), function(err, result)
    {
        if(result)
        {
            Session.setDefault(SESSION_USER_ID, result.userId);
            Session.setDefault(SESSION_NICK_NAME, result.nickName);
            Session.set(SESSION_USER_ID, result.userId);
            Session.set(SESSION_NICK_NAME, result.nickName);
        }
        else
        {
            // 결과가 없을 경우 새로운 사용자 추가정보 추가
            var email = Meteor.user().emails[0].address;
            Meteor.call("addNewUserAddition", Meteor.userId(), email);
            Session.setDefault(SESSION_USER_ID, Meteor.userId());
            Session.setDefault(SESSION_NICK_NAME, "");
            Session.set(SESSION_USER_ID, Meteor.userId());
            Session.set(SESSION_NICK_NAME, "");
        }
    });
});

Template.MainLayout.helpers({
    isNotSelectedChatRoom(){
        return Session.get(SESSION_SELECTED_CHAT_ROOM) == "";
    },
    add_friend_list(){
        return SearchFriend(Session.get(SESSION_SEARCH_KEY_WORD))
    },
    myfriend_list()
    {
        return FriendList();
    },
    chat_room_list()
    {
        return getChatRoomList();
    }
});

Template.MainLayout.events({
    'keyup .search-text-field'(e)
    {
        Session.set(SESSION_SEARCH_KEY_WORD,e.target.value);
    },
    'click #create-room'()
    {
        console.log('새로운 방 생성');
        Meteor.call('ChatRoom.createRoom',function(err, docInserted){
            console.log(Session.get(SESSION_USER_ID));
            Meteor.call('ChatRoom.addUser',docInserted, Session.get(SESSION_USER_ID));
        });
    },
    'click .log-out-button'()
    {
        Session.set(SESSION_SELECTED_CHAT_ROOM,"");
        Meteor.logout();
    }
})