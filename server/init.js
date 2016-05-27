/**
 * Created by Anonymous on 2016. 5. 26..
 */

Meteor.startup(function () {
    UploadServer.init({
        // https://github.com/tomitrescak/meteor-uploads 파일 업로드 패키지
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        checkCreateDirectories: true
    });
});
