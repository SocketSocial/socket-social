'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

  const User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  User
    .sync()
    .then(() => {
      return User;
    });

}