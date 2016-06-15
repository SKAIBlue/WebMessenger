/**
 * Created by Anonymous on 2016. 5. 26..
 */
Meteor.startup(function() {
    Uploader.uploadUrl = Meteor.absoluteUrl("upload");
    Uploader.finished = function(index, file){
        var uploadSelector = Session.get(SESSION_UPLOAD_SELECTOR);
        if(uploadSelector == UPLOAD_FILE)
        {
            var selectedChatRoom = Session.get(SESSION_SELECTED_CHAT_ROOM);
            var isImage = (file.type.indexOf('image') >= 0)
            Chat.insert({
                chatUserId: Session.get(SESSION_USER_ID),
                chatRoomId: selectedChatRoom,
                chatText:"upload/"+file.path,
                chatTime:new Date(),
                isFile:true,
                isImage:isImage
            });
        }
        else if(uploadSelector == UPLOAD_PROFILE)
        {
            var _id = UserAddition.findOne({userId:Meteor.userId()})._id;
            UserAddition.update(_id, {$set:{profile:"upload/"+file.path}});
            Materialize.toast('프로필 사진 변경 완료',3000);
        }
    }
});