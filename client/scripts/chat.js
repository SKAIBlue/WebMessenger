/**
 * Created by jwmtp on 2016-06-13.
 */

function scrollBottom()
{
    var scroll = $('.chat-list-inner');
    scroll.scrollTop(scroll.prop('scrollHeight'));
}

Template.chat.onRendered(function () {
    scrollBottom();
});
