/**
 * Created by Anonymous on 2016. 5. 20..
 * 시작 페이지에서 작동하는 스크립트 입니다
 */
Template.StartLayout.events({
    /**
     * 시작하기 버튼을 눌렀을 때 작동합니다
     */
    "click #start-button" ()
    {
        //$("#start-button").remove();
        //Template.StartLayout.onRendered
        // 상태를 회원가입으로 바꿈 ( 템플릿 변경 )
        Session.set("pageState", PageState.SIGN_UP);
        //Meteor.call("onClickStartButton");
    }
})