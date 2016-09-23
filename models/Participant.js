/**
 * Created by rkirby on 9/21/16.
 */

'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    const Participant = sequelize.define('participant');

    return Participant;
};
