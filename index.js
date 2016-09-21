const express    = require('express');
const path       = require('path');

const app         = express();
const sequelize   = require('./config/db');
const models      = require('./models/models')(sequelize);
const setup       = require('./config/setup')(app);
const api         = require('./api/api')(app, models);
const routes      = require('./routes/routes')(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
