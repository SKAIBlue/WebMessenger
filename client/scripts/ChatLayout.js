/**
 * Created by Anonymous on 2016. 6. 13..
 */

Template.ChatLayout.helpers({
    chat_list(){
        return getChatList(Session.get(SESSION_SELECTED_CHAT_ROOM));
    }
});