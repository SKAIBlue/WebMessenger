/**
 * Created by Anonymous on 2016. 5. 26..
 */
Meteor.startup(function() {
    Uploader.uploadUrl = Meteor.absoluteUrl("upload");
    Uploader.finished = function(index, file){
        var uploadSelector = Session.get(SESSION_UPLOAD_SELECTOR);
        if(uploadSelector == UPLOAD_FILE)
        {
            console.log("upload file");
        }
        else if(uploadSelector == UPLOAD_PROFILE)
        {
            var _id = UserAddition.findOne({userId:Meteor.userId()})._id;
            UserAddition.update(_id, {$set:{profile:"upload/"+file.path}});
            alert("프로필이 변경되었습니다.");
        }
    }
});