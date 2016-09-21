'use strict';

const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(express.static('public'));
    app.use(bodyParser());
}
