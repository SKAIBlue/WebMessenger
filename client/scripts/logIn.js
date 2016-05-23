/**
 * Created by Anonymous on 2016. 5. 24..
 */
/**
 * 로그인을 하는 함수입니다
  * @param email 이메일 주소
 * @param password 비밀번호
 */
var Login = function(email, password)
{
    Meteor.loginWithPassword( email, password, function(err){
            if(err)
            {
                alert("로그인 실패 " + err.toString());
            }
            else
            {
                Session.set("pageState", PageState.CHAT);
            }
        });
};

Template.LoginLayout.events({
    /**
     * 로그인 버튼을 눌렀을 때 호츨됩니다
     */
    "click #log-in-button"()
    {
        var email = $("#email-input-field");
        var password = $("#password-input-field");
        Login(email.val(), password.val());
    }
});