const mysql   = require('mysql');

const connection = mysql.createConnection({
  host     : '104.236.222.93',
  user     : 'root',
  password : 'hack2016!',
  database : 'socketsocial'
});

module.exports = connection;
