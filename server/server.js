/**
 * Created by Anonymous on 2016. 4. 30..
 */
Meteor.startup(function () {

});

Meteor.publish('UserAddition', function tasksPublication() {
    return UserAddition.findAll();
});