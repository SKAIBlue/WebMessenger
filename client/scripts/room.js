/**
 * Created by Anonymous on 2016. 6. 13..
 */
Template.room.events({
    'click .chat-room-box'()
    {
        Session.set(SESSION_SELECTED_CHAT_ROOM, this.roomId);
    }
});