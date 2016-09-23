'use strict';

module.exports = function (models) {
    const User        = models.User;
    const Hobby       = models.Hobby;
    const Event       = models.Event;
    const Participant = models.Participant;

    User.hasMany(Participant, { as: 'Participants' });
    User.hasMany(Hobby, { as: 'Hobbies' });
    User.hasMany(Event, { as: 'Events' });
    Event.hasMany(Participant, { as: 'Participants' });


};
