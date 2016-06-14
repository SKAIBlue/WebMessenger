/**
 * Created by Anonymous on 2016. 6. 14..
 */

Template.MyInfo.onCreated(function(){
    Uploader.init(this);
});

Template.MyInfo.rendered = function()
{
    Uploader.render.call(this);
}

Template.MyInfo.helpers({

});

Template.MyInfo.events({
    'click .modify-nick-name-form'(e)
    {
        var input = document.getElementById('input_nickname');
        Meteor.call('UserAddition.ModifyNickName',input.value);
    },
    'click .modify-password-form'(e)
    {
        var oldPassword = document.getElementById('old_password');
        var password1 = document.getElementById('input_password1');
        var password2 = document.getElementById('input_password2');
        if(password1.value == password2.value)
        {
            Meteor.call('Users.ChangePassword', oldPassword.value, password1.value, function(err){
                if(err)
                {
                    alert("오류");
                }
            });
        }
        else
        {
            alert("입력한 비밀번호가 다릅니다");
        }
    },
    'click .profile-image-form'()
    {
        Session.set(SESSION_UPLOAD_SELECTOR, UPLOAD_PROFILE);
        $('#profile-upload-input').click();
    },
    'click .change-profile-button-form'(e)
    {
//        Uploader.init(onCreate);
//        Uploader.render.call(onRender);
        console.log('click upload button');
        Uploader.startUpload.call(Template.instance(), e);
    }
});