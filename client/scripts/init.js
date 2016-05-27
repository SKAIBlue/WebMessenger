/**
 * Created by Anonymous on 2016. 5. 26..
 */
Meteor.startup(function() {
    Uploader.uploadUrl = Meteor.absoluteUrl("upload");
    Uploader.finished = function(index, file){
        Uploads.insert(file);
    }
});