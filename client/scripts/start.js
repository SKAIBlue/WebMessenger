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

        Template.StartLayout.onRendered
        //Meteor.call("onClickStartButton");
    }
})