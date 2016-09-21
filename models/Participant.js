/**
 * Created by rkirby on 9/21/16.
 */

'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    const Participant = sequelize.define('participant', {
        name: {
            type: Sequelize.STRING
        }

    });

    // hasone User
    // hasmany Events

    Participant.sync();

    return Participant;
};