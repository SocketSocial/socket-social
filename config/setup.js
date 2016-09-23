'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const cookieSession = require('cookie-session');

module.exports = function (app) {
    app.set('view engine', 'ejs');
    app.set('trust proxy', 1);
    app.use(bodyParser());
    app.use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2', 'key3'],
        isSignedIn: false,
        email: null
    }));
    app.use(express.static('public'));
};
