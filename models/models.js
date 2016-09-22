'use strict';

module.exports = function (sequelize) {

    const User          = require('./User')(sequelize);
    const Event         = require('./Event')(sequelize);
    const Participant   = require('./Participant')(sequelize);
    const Hobby         = require('./Hobby')(sequelize);

    const models =  {
        User,
        Event,
        Hobby,
        Participant
    };

    const associations = require('./associations')(models);
    const sync         = require('./sync')(models);

    return models;
}
