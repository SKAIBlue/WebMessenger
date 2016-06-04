/**
 * Created by Anonymous on 2016. 5. 20..
 * 미티어 메소드들을 여기에 작성합니다
 */

Meteor.methods({
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
     * emil을 이용해 유저를 검색합니다
     * @param email 이메일
     * @param callback 콜백
     * @returns {*}
     */
    'UserAddition.find'(email, callback)
    {
        // email로 시작하는 문자열 정규 표현식
        var regEx =  email + '.*';
        return Meteor.users.find({emails:{$elemMatch:{address:{$regex:regEx}}}}, callback);
    },
    /**
     * 유저 추가 정보를 찾습니다
     * @param id id
     * @param callback 콜백
     * @returns {*|316|776|137}
     */
    'UserAddition.findOne'(id,callback)
    {
        return UserAddition.findOne({userId:id}, callback);
    },
    /**
     * 새로운 방을 생성합니다
     * @param callback 콜백, 여기서 데이터 처리
     */
    'ChatRoom.createRoom'(callback)
    {
        return ChatRoom.insert({ whoIn:[]}, callback);
    },
    /**
     * 채팅방에 사용자를 추가합니다.
     * @param userId
     */
    'ChatRoom.addUser'(roomId, userId)
    {
        UserAddition.update({userId:userId},{$push:{chatRoomList:roomId}});
        ChatRoom.update(roomId, {$push:{whoIn:userId}});
        var re = ChatRoom.findOne({_id:roomId});
        console.log(re);
        re.whoIn.push("eeee");
    },
    'ChatRoom.findOne'(roomId, callback)
    {
        return ChatRoom.findOne({_id:roomId}, callback);
    }
});

