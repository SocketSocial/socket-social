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

  // force: true will drop the table if it already exists
  User.sync({ force: true });

  return User;

}
