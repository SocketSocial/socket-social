'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
