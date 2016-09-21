'use strict';

const bodyParser = require('body-parser');
const md5 = require('md5');


module.exports = function (app, sequelize, models) {

    app.get('/signin', (req, res) => {
       const email = req.body.email;
       const password = md5(req.body.password);

        models.User.findOne({
            where: {
                email
            }
        })
            .then(result => {
                console.log(result);
            });

    });

    app.get('/users/create', (req, res) => {

        const email = req.body.email;
        const password = md5(req.body.password);

        models.User.create({
            email,
            password
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
