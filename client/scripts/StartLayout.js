/**
 * Created by Anonymous on 2016. 5. 20..
 * 시작 페이지에서 작동하는 스크립트 입니다
 */
Template.StartLayout.events({
    /**
     * 시작하기 버튼을 눌렀을 때 작동합니다
     */
    "click #start-button": function(){
        $("#start-button").remove();
        var LoginLayout = Template.LoginLayout;
        var LoginId = document.getElementById('LoginForm');
        Blaze.render(LoginLayout, LoginId); // 탬플릿 랜더링
        $('.at-title').remove();            //at-form 타이틀 제거
        $('#at-btn').addClass('light-blue');//버튼색상 변경
    }
})