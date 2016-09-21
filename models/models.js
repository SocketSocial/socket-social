module.exports = function (sequelize) {

    return {
        User: require('./User')(sequelize)
    }
    
}
