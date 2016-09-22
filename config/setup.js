'use strict';

const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser());
}
