/**
 * Created by Anonymous on 2016. 6. 10..
 */
let SESSION_CONNECT_TIME = "connectTime";

Template.StartLayoutSelect.onCreated(function StartLayoutCreateTime(){
    var date = new Date();
    Session.setDefault(SESSION_CONNECT_TIME, date.getTime());
});

Template.StartLayoutSelect.helpers({
   delay()
   {
       var date = new Date();
        return (date.getTime() - Session.get(SESSION_CONNECT_TIME) < 300);
   }
});