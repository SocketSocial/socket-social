'use strict';

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('../views/index', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/signin', (req, res) => {
        if (req.session.isSignedIn) {
            res.redirect('/event-calendar');
            return false;
        }

        res.render('../views/signin', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/signup', (req, res) => {
        if (req.session.isSignedIn) {
            res.redirect('/event-calendar');
            return false;
        }

        res.render('../views/signup', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/event-calendar', (req, res) => {
        res.render('../views/events', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email,
            userId: req.session.userId
        });
    });

    app.get('/event/new', (req, res) => {
        res.render('../views/new_event', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email,
            userId: req.session.userId
        });
    });

    app.get('/members', (req, res) => {
        res.render('../views/members', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email
        });
    });

    app.get('/profile', (req, res) => {
        res.render('../views/profile', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email,
            name: req.session.name,
            userId: req.session.userId
        });
    });

    app.get('/profile/:id', (req, res) => {
        const userId = req.params.id;

        res.render('../views/profile', {
            isSignedIn: req.session.isSignedIn,
            email: req.session.email,
            userId
        });
    });


    // Administrative Controls
    app.get('/admin', (req, res) => {
        // if (!req.session.isAdmin) {
        //     res.redirect('/');
        //     return false;
        // }

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
