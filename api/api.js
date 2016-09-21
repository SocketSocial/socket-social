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

    // Create a new event
    app.post('/events', (req, res) => {
        const date          = req.body.date;
        const location      = req.body.location;
        const description   = req.body.description;

        // Malformed event
        if (!date || !location || !description) {
            res.send({
                'error': 'A new event must have a date, a location and a description.'
            });
        }

        models.Event.create({ date, location, description })
            .then(event => {
                res.send({ 'success': true, event });
            })
            .catch(err => res.send({ err }));
    });

    // Get all events
    app.get('/events', (req, res) => {
        models.Event.findAll()
            .then(events => {
                res.send({ events });
            })
            .catch(err => res.send({ err }));
    });

    // Get an event
    app.get('/events/:id', (req, res) => {
        const id = req.params.id;

        model.Event.findOne({
            where: { id }
        })
            .then(event => {
                res.send({ 'success': true, event });
            })
            .catch(err => res.send({ err }));
    });

    // Update an event
    app.post('/events/:id', (req, res) => {
        const id            = req.params.id;
        const date          = req.body.date;
        const description   = req.body.description;
        const location      = req.body.location;

        if (!date || !description || !location) {
            res.send({
                'error': 'When updating an event, date, description and location are required.'
            });
        }

        model.Event.update({ date, description, location }, {
            where: { id }
        })
            .then(event => {
                res.send({ 'success': true, event });
            })
            .catch(err => res.send({ err }));
    });

    // Delete an event TODO
    app.delete('/events/:id', (req, res) => {

    });

    // === H O B B I E S === //

    // Create a hobby people can select
    app.post('/hobbies', (req, res) => {
        const name          = req.body.date;
        const category      = req.body.location;

        // Malformed event
        if (!name || !category) {
            res.send({
                'error': 'A new hobby must have a name and a category.'
            });
        }

        models.Hobby.create({ name, category })
            .then(hobby => {
                res.send({ 'success': true, hobby });
            })
            .catch(err => res.send({ err }));
    });

    // Get all hobbies
    app.get('/hobbies', (req, res) => {
        models.Hobby.findAll()
            .then(hobbies => {
                res.send({ hobbies });
            })
            .catch(err => res.send({ err }));
    });

    // Get a specific hobby
    app.get('/hobbies/:id', (req, res) => {
        const id = req.params.id;

        model.Hobby.findOne({
            where: { id }
        })
            .then(hobby => {
                res.send({ 'success': true, hobby });
            })
            .catch(err => res.send({ err }));
    });

    // Update a hobby
    app.get('/hobbies/:id', (req, res) => {
        const id        = req.params.id;
        const name      = req.body.name;
        const category  = req.body.category;

        if (!name || !category) {
            res.send({
                'error': 'When updating a hobby, name and category are required.'
            });
        }

        model.Hobby.update({ name, category }, {
            where: { id }
        })
            .then(hobby => {
                res.send({ 'success': true, hobby });
            })
            .catch(err => res.send({ err }));
    });

    // Delete a specific hobby TODO
    app.delete('/hobbies/:id', (req, res) => {

    });

};
