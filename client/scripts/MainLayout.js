/**
 * Created by kth on 16. 5. 23.
 */
// TODO  1. Main 페이지에서 만약,닉네임이 없다면 닉네임을 정하도록 하는 화면 띄우기

Template.MainLayout.onCreated(function MainLayoutOnCreated()
{
    Meteor.subscribe('UserAddition');
    Meteor.call("UserAddition.findOne",Meteor.userId(), function(err, result)
    {
        if(result)
        {
            Session.setDefault("userId", result.userId);
            Session.setDefault("nickName", result.nickName);
        }
        else
        {
            Meteor.call("addNewUserAddition", Meteor.userId());
            Session.setDefault("userId", Meteor.userId());
            Session.setDefault("nickName", "");
        }
    });
});

