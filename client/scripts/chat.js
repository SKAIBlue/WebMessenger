/**
 * Created by jwmtp on 2016-06-13.
 */

function scrollBottom() {
    var scroll = $('.chat-list-inner');
    scroll.scrollTop(scroll.prop('scrollHeight'));
}

Template.chat.onRendered(function () {
    scrollBottom();
});

Template.chat.events({
    'click .download-file'(e)
    {
        event.preventDefault();
        downloadFile($('.download-file').attr('data-url'));
    }
})

downloadFile = function (sUrl) {
    window.URL = window.URL || window.webkitURL;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', sUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        var res = xhr.response;
        var blob = new Blob([res], {type: "audio/mp3"});
        url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = sUrl.split('/').pop();
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };
    xhr.send();
}