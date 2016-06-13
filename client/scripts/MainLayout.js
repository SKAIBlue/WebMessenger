/**
 * Created by kth on 16. 5. 23.
 */
import { Template } from 'meteor/templating';

var FriendList = function()
{
    var myAddition = UserAddition.findOne({userId:Meteor.userId()});
    var friendIds = myAddition.friends;
    var result = [];
    for(var i = 0 ; i < friendIds.length ; ++i )
    {
        var id = friendIds[i];
        var friend = UserAddition.findOne({userId:id});
        var profile = friend.profile.length == 0 ? "img/default_profile.png" : friend.profile;
        var nickName = friend.nickName.length == 0 ? friend.email : friend.nickName;
        result.push({
            friendId:id,
            friend_name:nickName,
            friend_img:profile
        });
    }
    return result;
}

var SearchFriend = function( email )
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
        var profile = friend.profile.length == 0 ? "img/default_profile.png" : friend.profile;
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
    return "img/default_profile.png";
}

function getChatRoomList()
{
    var addition = UserAddition.findOne({userId:Session.get(SESSION_USER_ID)});
    var myChatRoom = addition.chatRoomList;
    var chatRoom = [];
    for(var i = 0 ; i < myChatRoom.length ; ++i)
    {
        var roomId = myChatRoom[i];
        ChatRoom.findOne(roomId);
        console.log(roomId);
        chatRoom.push({
            roomId: roomId,
            chatRoomName:buildRoomName(roomId),
            chatRoomImage:getRoomImage(roomId)
        });
    }
    return chatRoom;
}

function getChatList(selectedChatRoom)
{
    var chat = Chat.find({roomId:selectedChatRoom});
    return chat;
    var result = [];
    for(var d in chat)
    {
        result.push({
            chatWho:d.chatWho,
            chatProfile:d.chatProfile,
            chatText:d.chatText,
            chatTime:d.chatTime,
            isMy(){
                return Meteor.userId == d.chatWho;
            },
            position(){
                return (this.isMy()) ? "me":"you";
            }
        });
    }
    return result;
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
        }
        else
        {
            // 결과가 없을 경우 새로운 사용자 추가정보 추가
            var email = Meteor.user().emails[0].address;
            Meteor.call("addNewUserAddition", Meteor.userId(), email);
            Session.setDefault(SESSION_USER_ID, Meteor.userId());
            Session.setDefault(SESSION_NICK_NAME, "");
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
    'keydown .search-text-field'(e)
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
    'submit .input-form'(event)
    {
        event.preventDefault();
        var target = event.target;
        var text = target.text.value;
        sendMessage(text);
        target.text.value = "";
    },
    'click .send-button-form'()
    {
        var input = document.getElementById('input-message');
        var text = input.value;
        sendMessage(text);
        input.value = "";
    },
    'click .log-out-button'()
    {
        Session.set(SESSION_SELECTED_CHAT_ROOM,"");
        Meteor.logout();
    }
})

function sendMessage(message)
{
    if(message.length == 0)
    {
        return;
    }

    var selectedChatRoom = Session.get(SESSION_SELECTED_CHAT_ROOM);
    if(selectedChatRoom.length == 0)
    {
        console.log("not select chat room");
        return;
    }
    // 채팅 내용 저장
    Chat.insert({
        chatUserId: Session.get(SESSION_USER_ID),
        chatRoomId: selectedChatRoom,
        chatText:message,
        chatTime:new Date(),
        isFile:false
    });

}