const Sequelize = require('sequelize');
const mysql     = require('mysql2');

const sequelize = new Sequelize('socketsocial', 'root', 'hack2016!', {
  host: '104.236.222.93',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;
