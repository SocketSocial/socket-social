'use strict';

module.exports = function (models) {
    const User        = models.User;
    const Hobby       = models.Hobby;
    const Event       = models.Event;
    const Participant = models.Participant;

    User.hasMany(Hobby, { as: 'Hobbies' });
    User.hasMany(Event, { as: 'Events' });
    Participant.belongsTo(User);

};
