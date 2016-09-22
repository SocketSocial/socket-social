'use strict';

module.exports = function (app) {

    app.get('/', (req, res) => {
        console.log(req.session);
        req.session.cookie.test = false;
        console.log(req.session);
        
        res.render('../views/events');
    });

    app.get('/admin', (req, res) => {
        console.log(req.session);


        // if (!token || !authToken(token)) {
        //     res.render('../views/partials/auth_error')
        //     return false;
        // }

        res.render('../views/admin/admin');
    });

};

/**
 * Does a user have permission to access a restricted page?
 * @param {object} token - The body's token.
 */
function authToken(token) {
    return token.hasAdminAccess;
}
