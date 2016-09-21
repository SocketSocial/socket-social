'use strict';

module.exports = function (app, models) {

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

}
