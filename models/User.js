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

  User.sync();
<<<<<<< HEAD
  return User;


};
=======

  return User;   

}
>>>>>>> 23e234ced5cd267e0777edac6cb302ee8a5021f2
