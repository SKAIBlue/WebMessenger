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
     * 시작하기 버튼을 눌렀을 때 메소드
     */
    onClickStartButton: function ()
    {
        
    },
    /**
     * 회원을 추가하는 메소드 입니다
     * @param email 이메일 주소
     * @param password 비밀번호
     */
    addUser: function(emailAddress, passwd)
    {
        Accounts.createUser(emailAddress, passwd, function(err)
        {
            //오류 처리
            if(err)
            {
                alert("회원가입에 실패했습니다");
            }
            else
            {
                this.call("signIn", emailAddress, passwd);
            }
        });
    },
    /**
     * 로그인을 하는 메소드 입니다
     * @param emailAddress 이메일 주소
     * @param passwd 비밀번호
     */
    signIn:function(emailAddress, passwd)
    {
        this.loginWithPassword(emailAddress,passwd, function(err)
        {
            //오류 처리
            if(err)
            {
                alert("로그에 실패하였습니다. 아이디와 비밀번호를 확인해 주세요");
            }
            else
            {

            }
        });
    }
});