// Dependencies
const express = require('express');
const path    = require('path');

// Database
const sequelize = require('./config/db');
const models = require('./models/models')(sequelize);

// Instantiate app
var app = express();

// Set static folder
app.use(express.static('public'));

// API
const api = require('./api/api')(app, sequelize);

// Routing
const routes = require('./routes/routes')(app);

// Start server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
