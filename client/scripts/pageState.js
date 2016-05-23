/**
 * Created by Anonymous on 2016. 5. 22..
 */
/**
 * 페이지 상태들에대한 스크립트 입니다
 * 어떤 페이지를 보여줄 것인지에 대한 것을 도와줄 것 입니다
 */

/**
 * 페이지 상태를 저장할 열거형 입니다
 * @type {Object}
 */
PageState = Object.freeze({
    // 시작 페이지
    START:0,
    // 로그인 페이지
    LOG_IN:1,
    // 회원가입 페이지
    SIGN_UP:2,
    //채팅 페이지 (로그인 된 상태)
    CHAT:3
});

Session.setDefault("pageState", PageState.START);

/**
 * HTML 파일에서 현재 상태를 가져올 수 있습니다
 * ex) {{#if stateStart}}
 * {{/if}}
 */
Template.body.helpers({
    stateStart()
    {
        return Session.get("pageState") == PageState.START;
    },
    stateLogIn()
    {
        return Session.get("pageState") == PageState.LOG_IN;
    },
    stateSignUp()
    {
        return Session.get("pageState") == PageState.SIGN_UP;
    },
    stateChat()
    {
        return Session.get("pageState") == PageState.CHAT;
    }
});