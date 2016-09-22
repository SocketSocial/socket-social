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
                            res.send({ 'success': `A new user was created for ${email}.`, user });
                        })
                        .catch(err => res.send({ err }));
                }
            })
            .catch(err => res.send({ err }));
    });

    // Get all users
    app.get('/users', (req, res) => {
        models.User.findAll()
            .then(users => res.send(users))
            .catch(err => res.send({ err }));
    });

}
