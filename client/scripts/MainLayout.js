/**
 * Created by kth on 16. 5. 23.
 */
// TODO  1. Main 페이지에서 만약,닉네임이 없다면 닉네임을 정하도록 하는 화면 띄우기

Template.MainLayout.onCreated(function MainLayoutOnCreated()
{
    Meteor.subscribe('UserAddition');
    // 데이터베이스에 생성된 추가 데이터가 있는지 검사
    Meteor.call("UserAddition.findOne",Meteor.userId(), function(err, result)
    {
        if(result)
        {
            // 결과가 있을 경우
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
    chat_room_list: [
        {
            chatRoomName: '김태훈의 채팅방',
            chatRoomImage: '/img/default_profile.png'
        },
        {
            chatRoomName: '김태훈의 채팅방',
            chatRoomImage: '/img/default_profile.png'
        }
    ],
    chat_list:[
        {
            chatWho:'김태훈',
            chatProfile:'/img/default_profile.png',
            chatText:'안녕하세요.',
            chatTime:'2016.07.07',
            isMy : false, // TODO 쿼리 결과에 따른 함수 정의 필요 return true or false
            position : "me" // TODO 쿼리 결과에 따른 함수 정의 필요 return string me or you
        },
        {
            chatWho:'김태훈',
            chatProfile:'/img/default_profile.png',
            chatText:'반갑습니다.',
            chatTime:'2016.07.07',
            isMy : false, // TODO 쿼리 결과에 따른 함수 정의 필요 return true or false
            position : "me" // TODO 쿼리 결과에 따른 함수 정의 필요 return string me or you
        },
        {
            chatWho:'홍길동',
            chatProfile:'/img/default_profile.png',
            chatText:'반갑습니다.',
            chatTime:'2016.07.07',
            isMy : true, // TODO 쿼리 결과에 따른 함수 정의 필요 return true or false
            position : "you" // TODO 쿼리 결과에 따른 함수 정의 필요 return string me or you
        }
    ]
});



Template.MainLayout.events({
    
})

