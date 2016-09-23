'use strict';

const md5 = require('md5');

module.exports = function (app, models) {

    // Sign in to the application
    app.post('/signin', (req, res) => {
       const email    = req.body.email;
       const password = md5(req.body.password);

       models.User.findOne({
            where: { email }
        })
            .then(user => {

                if (user.dataValues.password === password) {
                    // Valid password
                    req.session.isSignedIn = true;
                    req.session.email      = email;
                    req.session.name       = user.dataValues.name;
                    req.session.userId     = user.dataValues.id;

                    res.send({ 'success': true, user });
                } else {
                    // Invalid password
                    res.send({ 'error': 'Invalid password.' });
                }
            })
            .catch(err => res.send({ err }));
    });

    // Create a new user
    app.post('/signup', (req, res) => {
        const name      = req.body.name;
        const email     = req.body.email;
        const password  = md5(req.body.password);
        const title     = req.body.title || '';
        const aboutMe   = req.body.aboutMe || '';
        const isAdmin   = req.body.isAdmin || false;

        if (!name || !email || !password) {
            res.send({ 'error': 'Malformed signup: A user must have a name, an email and a password.' });
            return false;
        }

        // Check to see if email is already in use
        models.User.findOne({
            where: { email }
        })
            .then(user => {

                if (user) {
                    // There's already a user
                    res.send({
                        'error': `A user already exists with email "${email}".`
                    });

                } else {

                    models.User.create({ name, email, password, title, aboutMe, isAdmin })
                        .then(user => {
                            res.send({ 'success': `A new user was created for ${email}.`, user });
                        })
                        .catch(err => res.send({ err }));
                }
            })
            .catch(err => res.send({ err }));
    });

    // Sign a user out
    app.post('/signout', (req, res) => {
        req.session.isSignedIn = false;
        res.redirect('/');
    });

    // Get all users
    app.get('/users', (req, res) => {
        models.User.findAll()
            .then(users => res.send(users))
            .catch(err => res.send({ err }));
    });

    // Get a single user
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;

        models.User.findOne({
            where: { id }
        })
            .then(user => res.send({ user }))
            .catch(err => res.send({ err }));
    });

    // Getting a user's info
    app.post('/users/:id/info', (req, res) => {
        const id     = req.params.id;
        const fields = req.body.fields;

        if (!fields) throw new Error('Malformed request: A user info request requires fields to grab');

        models.User.findOne({
            where: { id }
        })
            .then(user => {
                const info = {};

                for (let field of fields) {
                    info[field] = user.dataValues[field];
                }

                res.send({ info });

            })
            .catch(err => res.send({ err }));

    });
}
