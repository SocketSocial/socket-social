// Dependencies
const express = require('express');
const path    = require('path');

// Database
const db = require('./config/db');

// Instantiate app
var app = express();

// Set static folder
app.use(express.static('public'));

// Routing
const routes = require('./routes/routes')(app);

// Start server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
