'use strict';

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('../views/events', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/signin', (req, res) => {
        if (req.session.isSignedIn) {
            res.redirect('/');
        }
        
        res.render('../views/signin', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/signup', (req, res) => {
        res.render('../views/signup', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/events', (req, res) => {
        res.redirect('/');
    });

    app.get('/event/new', (req, res) => {
        res.render('../views/new_event', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/members', (req, res) => {
        res.render('../views/members', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    // Administrative Controls
    app.get('/admin', (req, res) => {
        if (!req.session.isAdmin) {
            res.redirect('/');
            return false;
        }

        // if (!token || !authToken(token)) {
        //     res.render('../views/partials/auth_error')
        //     return false;
        // }

        res.render('../views/admin/admin', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

};
