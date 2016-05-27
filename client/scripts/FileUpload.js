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

Template.ImageUpload.helpers({
    profile()
    {
        return profile;
    },
    chatRoom()
    {
        return chatRoom;
    }
});

Template.ImageUpload.events({
    'click #image-upload'()
    {

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
