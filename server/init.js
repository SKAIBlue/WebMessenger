/**
 * Created by Anonymous on 2016. 5. 26..
 */

Meteor.startup(function () {
    UploadServer.init({
        // https://github.com/tomitrescak/meteor-uploads 파일 업로드 패키지
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        checkCreateDirectories: true,
        getDirectory:function(fileInfo, formData)
        {
            if(formData && formData.directoryName != null)
            {
                return formData.directoryName;
            }
            return "";
        },
        getFileName:function(fileInfo, formData)
        {
            if(formData && formData.prefix != null)
            {
                return formData.prefix + '_' + fileInfo.name;
            }
            return fileInfo.name;
        },
        finished: function(fileInfo,formData)
        {
            // 디스크 운영 처리
            if(formData && formData._id != null)
            {
                console.log("finish");
                Items.update({_id:formData._id} , {$push: {uploads:fileInfo}})
            }
        }
    });
});
