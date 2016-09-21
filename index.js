// Dependencies
const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');

// Database
const sequelize = require('./config/db');

// Models
const models = require('./models/models')(sequelize);

// Instantiate app
var app = express();

// Set static folder
app.use(express.static('public'));
app.use(bodyParser());

// API
const api = require('./api/api')(app, sequelize, models);

// Routing
const routes = require('./routes/routes')(app);

// Start server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
