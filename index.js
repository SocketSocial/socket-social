var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '104.236.222.93',
  user     : 'root',
  password : 'hack2016!',
  database : 'socketsocial'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
