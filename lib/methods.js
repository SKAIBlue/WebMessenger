/**
 * Created by Anonymous on 2016. 5. 20..
 * 미티어 메소드들을 여기에 작성합니다
 */

Meteor.methods({
    /**
     * 미티어 메소드의 형식입니다
     * @param parameters 매개 변수
     */
    name: function( parameters )
    {

    },
    /**
     * 회원을 추가하는 메소드 입니다
     * @param email 이메일 주소
     * @param password 비밀번호
     * @param callback 콜백 함수
     */
    addUser: function(emailAddress, password, callback)
    {
        Accounts.createUser({email:emailAddress, password:password},callback);
    },
    /**
     * 로그인을 하는 메소드 입니다
     * @param emailAddress 이메일 주소
     * @param password 비밀번호
     * @param callback 콜백 함수
     */
    logIn:function(emailAddress, password, callback) {
        Meteor.loginWithPassword({email: emailAddress, password: password}, callback);
    }
});

