'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const cookieSession = require('cookie-session');
const Chance        = require('chance');

const chance        = new Chance();

module.exports = function (app) {
    app.set('view engine', 'ejs');
    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    }));
    app.use(express.static('public'));
};
