/**
 * Created by Anonymous on 2016. 5. 27..
 */
Template.testUpload.events({
    'click .start'(e)
    {
        Uploader.startUpload.call(Template.instance(), e);
    }
});

Template.testUpload.helpers({
   'infoLabel'()
   {
       var instance = Template.instance();

       var info = instance.info;
       if(!info)
       {
           return;
       }
        console.log("infoLabel");
       return progress.running ? info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']':
           info.name + ' - ' + info.size + 'B';
   },
    'progress'()
    {
        console.log("progress");
        return Template.instance().globalInfo.get().progress + '%';
    },
    'submitData'()
    {
        console.log("submitData");
        if(this.formData)
        {
            this.formData['contentType'] = this.contentType;
        }
        else
        {
            this.formData = {contentType:this.contentType};
            return typeof this.formData == 'string' ? this.formData:JSON.stringify(this.formData);
        }
    }
});