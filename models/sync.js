'use strict';

module.exports = function (models) {
    const User          = models.User;
    const Hobby         = models.Hobby;
    const Participant   = models.Participant;
    const Event         = models.Event;

    User.sync()
        .then(() => Hobby.sync()
            .then(() => Participant.sync()
                .then(() => Event.sync())));
};
