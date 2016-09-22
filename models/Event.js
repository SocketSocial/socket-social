'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

  const Event = sequelize.define('event', {
    description: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    }
  });

  return Event;
};
