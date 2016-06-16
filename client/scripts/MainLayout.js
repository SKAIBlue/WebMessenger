/**
 * Created by kth on 16. 5. 23.
 */
import { Template } from 'meteor/templating';
/**
 * 친구 목록을 가져옵니다
 * @returns {Array}
 * @constructor
 */
function FriendList() {
    Meteor.subscribe('UserAddition');
    var myAddition = UserAddition.findOne({userId: Session.get(SESSION_USER_ID)});
    if (myAddition) {
        var friendIds = myAddition.friends;
        var result = [];
        for (var i = 0; i < friendIds.length; ++i) {
            var id = friendIds[i];
            var friend = UserAddition.findOne({userId: id});
            var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
            var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
            result.push({
                friendId: id,
                friend_name: nickName,
                friend_img: profile
            });
        }
        return result;
    }
    //console.log("FriendList MyAddition return undefined");
    return [];
}
/**
 * 친구를 검색합니다
 * @param email email
 * @returns {Array} 사용자 배열
 * @constructor
 */
function SearchFriend(email) {
    Meteor.subscribe('UserAddition');
    if (email.length == 0) {
        return [];
    }
    var regEx = email + '.*';
    var results = [];
    var users = UserAddition.find({email: {$regex: regEx}});
    var myAddition = UserAddition.findOne({userId: Session.get(SESSION_USER_ID)});
    if(myAddition)
    {
        users.forEach(function (user) {
            if (myAddition.friends.indexOf(user.userId) > -1 || user.userId == Session.get(SESSION_USER_ID)) {
                return;
            }
            var friend = UserAddition.findOne({userId: user.userId});
            var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
            var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
            results.push({
                friendId: user.userId,
                nickName: nickName,
                Profile: profile,
                email: friend.email
            });
        });
    }
    return results;
}

/**
 * 방 목록을 만듭니다
 * @param roomId
 * @returns {*}
 */
function buildRoomName(roomId) {
    var chatRoom = ChatRoom.findOne({_id: roomId});
    if(chatRoom)
    {
        var whoIn = chatRoom.whoIn;

        if (whoIn.length == 1) {
            // 혼자 있는 경우
            return "대화 상대 없음";
        }
        else if (chatRoom.chatRoomName.length == 0) {
            // 방 제목을 설정하지 않은 경우
            if (whoIn.length == 2) {
                if (whoIn[0] == Session.get(SESSION_USER_ID)) {
                    var friend = UserAddition.findOne({userId: whoIn[1]});
                    var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
                    return nickName + " 님과의 대화"
                }
                else {
                    var friend = UserAddition.findOne({userId: whoIn[0]});
                    var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
                    return nickName + " 님과의 대화"
                }
            }
            else {
                return "제목 없는 그룹 대화";
            }
        }
        return chatRoom.chatRoomName;
    }
    //console.log("build room name chat room is undefined");
    return "제목 생성 오류";
}

function getRoomImage(roomId) {
    var chatRoom = ChatRoom.findOne({_id: roomId});
    if (chatRoom) {
        var whoIn = chatRoom.whoIn;

        if (whoIn.length == 1) {
            // 혼자 있는 경우
            return PROFILE_DEFAULT_PATH;
        }
        else if (chatRoom.chatRoomImage.length == 0) {
            // 방 프로필을 설정하지 않은 경우
            if (whoIn.length == 2) {
                if (whoIn[0] == Session.get(SESSION_USER_ID)) {
                    var friend = UserAddition.findOne({userId: whoIn[1]});
                    var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
                    return profile;
                }
                else {
                    var friend = UserAddition.findOne({userId: whoIn[0]});
                    var profile = friend.profile.length == 0 ? PROFILE_DEFAULT_PATH : friend.profile;
                    return profile;
                }
            }
            else {
                return PROFILE_DEFAULT_PATH;
            }
        }
        return chatRoom.chatRoomImage;
    }
    return PROFILE_DEFAULT_PATH;
}

function getChatRoomList(keyword) {
    Meteor.subscribe('UserAddition');
    Meteor.subscribe('ChatRoom');
    var addition = UserAddition.findOne({userId: Session.get(SESSION_USER_ID)});
    if (addition) {
        var myChatRoom = addition.chatRoomList;
        var chatRoom = [];
        for (var i = 0; i < myChatRoom.length; ++i) {
            var roomId = myChatRoom[i];
            var roomName = buildRoomName(roomId);
            var regEx = keyword + '.*';
            if (!(!keyword || !(keyword.length != 0)) && !roomName.match(regEx)) {
                continue;
            }
            ChatRoom.findOne(roomId);
            chatRoom.push({
                roomId: roomId,
                chatRoomName: buildRoomName(roomId),
                chatRoomImage: getRoomImage(roomId),
                NeedNotice:function()
                {
                    // TODO CHECK 새로 읽을 채팅이 있으면 "room-new-alarm" 을 리턴
                    return "room"
                }
                // 없으면 "room" 반환, 방 클릭시 NeedNotice 반환이 "room" 이 되어야함
            });
        }
        return chatRoom;
    }
    //console.log("userAddtion return undefined");
    return [];
}

Template.MainLayout.onCreated(function MainLayoutOnCreated() {
    // 구독
    Meteor.subscribe('UserAddition');
    Meteor.subscribe('ChatRoom');
    Meteor.subscribe('Chat');
    // 데이터베이스에 생성된 추가 데이터가 있는지 검사
    Session.setDefault(SESSION_SELECTED_CHAT_ROOM, "");
    Session.setDefault(SESSION_SEARCH_KEY_WORD, "");
    Session.setDefault(SESSION_UPLOAD_SELECTOR, "");
    Session.setDefault(SESSION_INPUT_READ_URL, "");
    Session.setDefault(SESSION_CHAT_COUNT, CHAT_COUNT_INCREMENT);
    Session.set(SESSION_SELECTED_CHAT_ROOM, "");
    Session.set(SESSION_SEARCH_KEY_WORD, "");
    Session.set(SESSION_UPLOAD_SELECTOR, "");
    Session.set(SESSION_INPUT_READ_URL, "");
    Session.set(SESSION_CHAT_COUNT, CHAT_COUNT_INCREMENT);
    Meteor.call("UserAddition.findOne", Meteor.userId(), function (err, result) {
        if (result) {
            Session.setDefault(SESSION_USER_ID, result.userId);
            Session.setDefault(SESSION_NICK_NAME, result.nickName);
            Session.set(SESSION_USER_ID, result.userId);
            Session.set(SESSION_NICK_NAME, result.nickName);
        }
        else {
            var userId = Meteor.userId();
            var email = Meteor.user().emails[0].address;
            Meteor.call("addNewUserAddition", userId, email);
            Session.setDefault(SESSION_USER_ID, userId);
            Session.setDefault(SESSION_NICK_NAME, "");
            Session.set(SESSION_USER_ID, userId);
            Session.set(SESSION_NICK_NAME, "");
        }
    });
});

Template.MainLayout.helpers({
    onChangeSelector()
    {
        return Session.get(SESSION_INPUT_READ_URL);
    },
    isNotSelectedChatRoom()
    {
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
        return getChatRoomList(Session.get(SESSION_SEARCH_CHAT_ROOM));
    }
});

Template.MainLayout.events({
    'keyup .search-text-field'(e)
    {
        Session.set(SESSION_SEARCH_KEY_WORD, e.target.value);
    },
    'keyup .search-chat-room-text-field'(e)
    {
        Session.set(SESSION_SEARCH_CHAT_ROOM, e.target.value);
    },
    'click #create-room'()
    {
        Meteor.call('ChatRoom.createRoom', function (err, docInserted) {
            Meteor.call('ChatRoom.addUser', docInserted, Session.get(SESSION_USER_ID));
        });
    },
    'click .log-out-button'()
    {
        Session.set(SESSION_SELECTED_CHAT_ROOM, "");
        Meteor.logout();
    }
})
