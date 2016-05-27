/**
 * Created by Anonymous on 2016. 5. 26..
 */
Meteor.startup(function() {
    Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
});