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

});

Template.MainLayout.events({

})

