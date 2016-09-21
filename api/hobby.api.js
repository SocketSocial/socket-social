'use strict';

module.exports = function (app, models) {

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

}
