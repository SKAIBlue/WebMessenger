/**
 * Created by Anonymous on 2016. 5. 27..
 * 파일 업로드에 관한 템플릿의 스크립트는 모두 여기 작성됩니다
 */

/**
 * 프로필 이미지에 대한 폼
 * @type {{directoryName: string, prefix: *, id: *}}
 */
var profile = {
    directoryName: 'profiles',
    prefix:this._id,
    id:this._id
}

/**
 * 채팅방에서 업로드한 파일들
 * @type {{}}
 */
var chatRoom =  {
    directoryName:function()
    {
        return '방 id 값';
    },
    prefix:this._id,
    id:this._id
}

Template.ChooseImage.created = function() {
    Uploader.init(this);
}

Template.ChooseImage.rendered = function () {
    Uploader.render.call(this);
};

Template.ChooseImage.helpers({
    profile()
    {
        return profile;
    },
    chatRoom()
    {
        return chatRoom;
    },
    imageFileType:'image/*',
    allFileType:''
});

Template.ChooseImage.events({
    'click .start'(e)
    {
        Uploader.startUpload.call(Template.instance(), e);
    },
    // 블레이즈에서 input 태그의 change 이벤트를 받을 수 없음
    'change #choose-profile'(event, template)
    {
        console.log("on Change choose profile");
    }
});

Template.FileUpload.helpers({

});

Template.FileUpload.events({

});

Template.InvisibleImageDropZone.helpers({
    profile()
    {
        return profile;
    }
});

Template.InvisibleImageDropZone.events({

});

Template.InvisibleFileDorpZone.helpers({

});

Template.InvisibleFileDorpZone.events({

});


Template.customUpload.created = function() {
    Uploader.init(this);
}

Template.customUpload.rendered = function () {
    Uploader.render.call(this);
};

Template.customUpload.events({
    'click .start': function (e) {
        Uploader.startUpload.call(Template.instance(), e);
    }
});

Template.customUpload.helpers({
    'infoLabel': function() {
        var instance = Template.instance();
        // we may have not yet selected a file
        var info = instance.info.get()
        if (!info) {
            return;
        }
        var progress = instance.globalInfo.get();

        console.log(progress.getDisplayPath().toString());
        // we display different result when running or not
        return progress.running ?
        info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
        info.name + ' - ' + info.size + 'B';
    },
    'progress': function() {
        return Template.instance().globalInfo.get().progress + '%';
    }
})