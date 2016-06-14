/**
 * Created by Anonymous on 2016. 6. 14..
 */
Template.MyInfo.helpers({

});

Template.MyInfo.events({
    'click .modify-nick-name-form'(e)
    {
        var input = document.getElementById('input_nickname');
        var myAddition = UserAddition.findOne({userId:Meteor.userId()});
        UserAddition.update(myAddition._id, {$set:{nickName:input.value}});
        alert("닉네임 성공적으로 변경됨");
    },
    'click .modify-password-form'(e)
    {
        var oldPassword = document.getElementById('old_password');
        var password1 = document.getElementById('input_password1');
        var password2 = document.getElementById('input_password2');
        if(password1.value == password2.value)
        {
            Meteor.users.changePassword(oldPassword.value, password1.value);
        }
        else
        {
            // 1,2차 비밀번호 다름
            alert("입력한 비밀번호가 다릅니다");
        }
    }
});