'use strict';

const md5 = require('md5');

module.exports = function (app, sequelize, models) {

    // === U S E R S === //

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
        const email     = req.body.email;
        const password  = md5(req.body.password);

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

                    models.User.create({ email, password })
                        .then(user => {
                            res.send({ 'success': true, user });
                        })
                        .catch(err => res.send({ err }));
                }
            })
            .catch(err => res.send({ err }));
    });

    // === E V E N T S === //

    // Get all events
    app.get('/events', (req, res) => {

    });

    // Get an event
    app.get('/events/:id', (req, res) => {

    });

    // Create a new event
    app.post('/events', (req, res) => {

    });

    // Update an event
    app.post('/events/:id', (req, res) => {

    });

    // Delete an event
    app.delete('/events/:id', (req, res) => {

    });

    // === H O B B I E S === //

    // Create a hobby people can select
    app.post('/hobbies', (req, res) => {

    });

    // Get all hobbies
    app.get('/hobbies', (req, res) => {

    });

    // Get a specific hobby
    app.get('/hobbies/:id', (req, res) => {

    });

    // Update a hobby
    app.get('/hobbies/:id', (req, res) => {

    });

    // Delete a specific hobby
    app.delete('/hobbies/:id', (req, res) => {

    });

};
