/**
 * Created by Anonymous on 2016. 5. 20..
 * 미티어 메소드들을 여기에 작성합니다
 */

Meteor.methods({
    /**
     * 새 유저 추가 정보를 추가합니다
     * @param id users 컬렉션의 _id
     */
    addNewUserAddition(id, email)
    {
        UserAddition.insert({userId:id, nickName:"", profile:"", email:email ,friends:[],chatRoomList:[]});
    },
    /**
     * 유저의 별명을 수정합니다
     * @param id users 컬렉션의 _id
     * @param nickName nickName 별명
     * @param callback 콜백 함수
     */
    'UserAddition.ModifyNickName'(nickName)
    {
        var myAddition = UserAddition.findOne({userId:this.userId});
        UserAddition.update(myAddition._id, {$set:{nickName:nickName}});
    },
    /**
     *
     * @param email
     * @param callback
     * @returns {*}
     */
    'UserAddition.find'(email, callback)
    {
        // email로 시작하는 문자열 정규 표현식
        var regEx =  email + '.*';
        return UserAddition.find({email:{$regex:regEx}}, callback);
    },
    /**
     *
     * @param id
     * @param callback
     * @returns {*|316|776|137}
     */
    'UserAddition.findOne'(id,callback)
    {
        return UserAddition.findOne({userId:id}, callback);
    },
    /**
     * friendId에 해당하는 친구를 추가합니다
     * @param friendId 친구 id
     */
    'UserAddition.AddFriend'(friendId)
    {
        var _id = UserAddition.findOne({userId:this.userId})._id;
        UserAddition.update(_id, {$push:{friends:friendId}});
    },
    /**
     * roomId에 해당하는 방에 friendId에 해당하는 친구를 추가합니다
     * @param roomId 방 id값
     * @param friend 친구 id값
     */
    'ChatRoom.invite'(roomId, friendId)
    {
        var _id = UserAddition.findOne({userId:Meteor.userId()})._id;
        UserAddition.update(_id, {$push:{chatRoomList:roomId}});
        ChatRoom.update(roomId, {$push:{whoIn:friendId}});
    },
    /**
     * 비밀번호를 변경합니다
     * @param oldPassword 이전 패스워드
     * @param newPassword 새로운 패스워드
     * @param callback 콜백 함수
     */
    'Users.ChangePassword'(oldPassword, newPassword, callback)
    {
        this.changePassword(oldPassword,newPassword, callback);
    }
});

