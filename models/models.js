'use strict';

module.exports = function (sequelize) {

    const User          = require('./User')(sequelize);
    const Event         = require('./Event')(sequelize);
    const Participant   = require('./Participant')(sequelize);
    const Hobby         = require('./Hobby')(sequelize);

    // Define relationships here

    return {
        User,
        Event,
        Hobby,
        Participant
    }

}
