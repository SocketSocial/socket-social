'use strict';

module.exports = function (app, sequelize, models) {

    app.get('/test', (req, res) => {
        models.User.create({
            email: 'cbryan@dealersocket.com',
            password: 'hack2016!'
        })
            .then(() => {
                res.send({
                    'success': true
                });
            })
            .catch(err => {
                res.send({
                    'success': false,
                    'error': err
                });
            });
    });

};
