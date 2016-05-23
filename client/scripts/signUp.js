/**
 * Created by Anonymous on 2016. 5. 24..
 */

Template.SignUpLayout.events({
    /**
     * 회원가입 버튼을 눌렀을 때 호출됩니다
     */
    "click #sign-up-button"()
    {
        var email = $("#email-input-field");
        var password = $("#password-input-field");
        Login(email.val(), password.val());
    },
    /**
     * 로그인 버튼을 눌렀을 때 로그인 회면으로 갑니다
     */
    "click #log-in-button"()
    {
        Session.set("pageState", PageState.LOG_IN);
    }
});