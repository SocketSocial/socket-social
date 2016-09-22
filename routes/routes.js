'use strict';

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('../views/events');
    });

    app.get('/signin', (req, res) => {
        res.render('../views/signin');
    });

    app.get('/signup', (req, res) => {
        res.render('../views/signup');
    });

    app.get('/admin', (req, res) => {
        if (!req.session.isAdmin) {
            res.redirect('/');
            return false;
        }

        // if (!token || !authToken(token)) {
        //     res.render('../views/partials/auth_error')
        //     return false;
        // }

        res.render('../views/admin/admin');
    });

};
