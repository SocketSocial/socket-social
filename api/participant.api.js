'use strict';

module.exports = function (app, models) {

        // Create a Participant people can select
        app.post('/participants', (req, res) => {
            const userId          = parseInt(req.body.userId);
            const eventId         = parseInt(req.body.eventId);

            models.Participant.create({ userId, eventId })
                .then(participant => {
                    res.send({ 'success': true, participant: participant.dataValues });
                })
                .catch(err => res.send({ err }));
        });

        // Get all participants
        app.get('/participants', (req, res) => {
            models.Participant.findAll()
                .then(participants => {
                    res.send(participants);
                })
                .catch(err => res.send({ err }));
        });

        // Delete a specific Participant TODO
        app.delete('/participants/:id', (req, res) => {

        });

}
