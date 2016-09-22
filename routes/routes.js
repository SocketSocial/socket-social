'use strict';

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('../views/events');
    });

    app.get('/admin', (req, res) => {
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
function checkToken(token) {
    return token.hasAdminAccess;
}
