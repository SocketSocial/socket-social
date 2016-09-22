'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Hobby = sequelize.define('hobby', {
        name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        }
    });

    return Hobby;
};
