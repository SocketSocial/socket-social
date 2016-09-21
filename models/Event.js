'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

  const Event = sequelize.define('event', {
    description:{

     type: Sequelize.STRING },

    location: {
         type: Sequelize.STRING }
         ,
    date: {
             type: sequelize.DATE

    }

  });

<<<<<<< HEAD
  // Need to add association for participant


  Event.sync();
  return Event;

    
};
=======
  Event.sync();

  return Event;   

}
>>>>>>> 23e234ced5cd267e0777edac6cb302ee8a5021f2
