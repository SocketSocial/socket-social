module.exports = function (sequelize) {

    const User = require('./User')(sequelize);
    const Event = require('./Event')(sequelize);

    // Define relationships here

    return {
        User,
        Event
    }

}
