/**
 * Created by Anonymous on 2016. 6. 13..
 */
let SESSION_CONNECT_TIME = "connectTime";

Template.StartLayoutSelectPage.onCreated(function(){
    var date = new Date();
    Session.setDefault(SESSION_CONNECT_TIME, date.getTime());
});

Template.StartLayoutSelectPage.helpers({
   isDelay(){
       var date = new Date();
       return date.getTime() - Session.get(SESSION_CONNECT_TIME) < 300;
   }
});