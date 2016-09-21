// Dependencies
const express = require('express');
const path    = require('path');
const mysql   = require('mysql');

// Database
const connection = mysql.createConnection({
  host     : '104.236.222.93',
  user     : 'root',
  password : 'hack2016!',
  database : 'socketsocial'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();

// Instantiate app
var app = express();

// Set static folder
app.use(express.static('public'));

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
