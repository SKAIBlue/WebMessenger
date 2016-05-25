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
     * 새 유저 추가 정보를 추가합니다
     * @param id users 컬렉션의 _id
     */
    addNewUserAddition(id){
        UserAddition.insert({userId:id, nickName:"", chatRoomList:[]});
    },
    /**
     * 유저의 별명을 수정합니다
     * @param id users 컬렉션의 _id
     * @param nickName nickName 별명
     * @param callback 콜백 함수
     */
    modifyUserNickName(id, nickName, callback){

    },
    /**
     * 친구 추가에서 다른 사용자를 검색할 때 사용
     * @param email 검색 키워드
     * @param callback 콜백 함수
     * @returns {*} email로 시작하는 이메일 주소를 가진 사용자 추가 정보
     */
    'User.find'(email, callback)
    {
        // email 로 시작하는 문자열 정규 표현식
        var regEx =  email + '.*';
        return Meteor.users.find({emails:{$elemMatch:{address:{$regex:regEx}}}}, callback);
    },
    /**
     * id 감ㅅ을 이용해 하나의 유저를 가져옵니다
     * @param id
     * @param callback
     * @returns {*|316|776|137}
     */
    'UserAddition.findOne'(id,callback)
    {
        return UserAddition.findOne({userId:id}, callback);
    },
});

