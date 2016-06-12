/**
 * Created by kth on 16. 5. 23.
 */
import { Template } from 'meteor/templating';

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
            if(whoIn[0] == Session.get("userId"))
            {
                return whoIn[1] + " 님과의 대화"
             }
            else
            {
                return whoIn[0] + " 님과의 대화"
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

Template.MainLayout.onCreated(function MainLayoutOnCreated()
{
    // 구독
    Meteor.subscribe('UserAddition');
    Meteor.subscribe('ChatRoom');
    Meteor.subscribe('Chat');
    // 데이터베이스에 생성된 추가 데이터가 있는지 검사
    Session.setDefault("selectedChatRoom","");
    Meteor.call("UserAddition.findOne",Meteor.userId(), function(err, result)
    {
        if(result)
        {
            Session.setDefault("userId", result.userId);
            Session.setDefault("nickName", result.nickName);
        }
        else
        {
            // 결과가 없을 경우 새로운 사용자 추가정보 추가
            Meteor.call("addNewUserAddition", Meteor.userId());
            Session.setDefault("userId", Meteor.userId());
            Session.setDefault("nickName", "");
        }
    });
});

Template.MainLayout.helpers({
    add_friend_list(){
        return [{
            email : "rlaxoqkd123@naver.com",    //임시
            Profile : "img/default_profile.png",
            nickName: "김태훈"
        }];
    },
    myfriend_list()
    {
        return [{
            friend_name : "김태훈",            //나의 친구 목록 중 이름
            friend_img : "img/default_profile.png" // 프로필
        }];
    },
    chat_room_list()
    {
        var addition = UserAddition.findOne({userId:Session.get("userId")});
        console.log(addition);
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
    },
    chat_list(){
        var selectedChatRoom = Session.get("selectedChatRoom");
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
    }
});

Template.MainLayout.events({
    'click #find_friend_list'()
    {
        var input_value = document.getElementById('input_add_friend').value;
        if(!input_value) {
            Materialize.toast('찾을 친구의 이메일이나 닉네임을 입력하세요', 2000); //토스트
        }else{
           //TODO 구축
        }

    },
    'click #create-room'()
    {
        console.log('새로운 방 생성');
        Meteor.call('ChatRoom.createRoom',function(err, docInserted){
            console.log(Session.get("userId"));
            Meteor.call('ChatRoom.addUser',docInserted, Session.get("userId"));
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
    }
})

function sendMessage(message)
{
    if(message.length == 0)
    {
        return;
    }

    var selectedChatRoom = Session.get("selectedChatRoom");
    if(selectedChatRoom.length == 0)
    {
        console.log("not select chat room");
        return;
    }
    // 채팅 내용 저장
    Chat.insert({
        chatUserId: Session.get("userId"),
        chatRoomId: selectedChatRoom,
        chatText:message,
        chatTime:new Date(),
        isFile:false
    });

}