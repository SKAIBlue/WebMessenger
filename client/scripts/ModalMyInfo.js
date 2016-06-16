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
            Accounts.changePassword(oldPassword.value, password1.value, function(err){
                if(err)
                {
                    Materialize.toast(err);
                }
                else
                {
                    Materialize.toast("비밀번호가 성공적으로 변경되었습니다",3000);
                }

            });
        }
        else
        {
            Materialize.toast("1차, 2차 비밀번호가  서로 다릅니다.",3000);
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
        //console.log('click upload button');
        Uploader.startUpload.call(Template.instance(), e);
    }
});