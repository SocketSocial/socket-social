'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');

module.exports = function (app) {
    app.set('view engine', 'ejs');
    app.set('trust proxy', 1);
    app.use(session({
        secret: 'hack2016!!',
        cookie: {
            test: true,
            secure: true,
            httpOnly: false
        }
    }));
    app.use(express.static('public'));
    app.use(bodyParser());
};
