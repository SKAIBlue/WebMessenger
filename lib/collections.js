/**
 * Created by Anonymous on 2016. 5. 20..
 * 몽고 데이터베이스 컬렉션과 구독을 관리합니다
 */
// 사용자 추가정보 (예: 닉네임,접속 해 있는 방 정보)
/*
{
userId : 미티어 로그인 정보의 id값
nickName: 별명
profile: 프로필 사진
friends:[] 친구 id
room:[] 접속해 있는 방(id) 정보
}
 */
UserAddition = new Mongo.Collection('UserAddition');
// 채팅 방 정보
/*
{
_id : 방 id
who_in: 접속자 정보
chatRoomName:채팅 방 이름
chatRoomImage:채팅 방 이미지
}
 */
ChatRoom = new Mongo.Collection('ChatRoom');
// 채팅 내용 정보 저장
/*
 {
 room_id : 채팅 방 id
 chatWho: 보낸 사용자의 id
 chatText: 채팅 내용(파일일 경우 경로)
 chatTime: 보낸 시간(정렬)
 isFile: 파일인지 여부
 }
 */
Chat = new Mongo.Collection('Chat');

