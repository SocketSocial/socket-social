(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    createEvent: function createEvent(data) {
        return new Promise(function (resolve, reject) {
            if (!data.date || !data.location || !data.description) {
                console.error('createEvent must be called with a date, a location, and a description.');
                reject();
            }

            $.ajax({
                type: 'POST',
                url: '/events',
                dataType: 'JSON',
                data: data,
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    getEvent: function getEvent(id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'GET',
                url: '/events/' + id,
                dataType: 'JSON',
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    getEvents: function getEvents() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'GET',
                url: '/events/',
                dataType: 'JSON',
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    updateEvent: function updateEvent(data) {
        return new Promise(function (resolve, reject) {
            if (!data.id || !data.date || !data.location || !data.description) {
                console.error('updateEvent must be called with an id, a date, a location, and a description.');
                reject();
            }

            $.ajax({
                type: 'POST',
                url: '/events/' + options.id,
                dataType: 'JSON',
                data: data,
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    }
};

},{}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class EventModule
 * Functionality taking API information related to events from the backend and creating components.
 */
module.exports = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.api = require('./event.api');
    }

    return _class;
}();

},{"./event.api":1}],3:[function(require,module,exports){
'use strict';

module.exports = {
    createHobby: function createHobby(data) {
        return new Promise(function (resolve, reject) {
            if (!data.name || !data.category) {
                console.error('createHobby must be called with a name and a category.');
                reject();
            }

            $.ajax({
                type: 'POST',
                url: '/hobbies',
                dataType: 'JSON',
                data: data,
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    getHobby: function getHobby(id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'GET',
                url: '/hobbies/' + id,
                dataType: 'JSON',
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    getHobbies: function getHobbies() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'GET',
                url: '/hobbies/',
                dataType: 'JSON',
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    updateHobby: function updateHobby(data) {
        return new Promise(function (resolve, reject) {
            if (!data.id || !data.name || !data.category) {
                console.error('updateHobby must be called with an id, a name, and a category.');
                reject();
            }

            $.ajax({
                type: 'POST',
                url: '/hobbies/' + options.id,
                dataType: 'JSON',
                data: data,
                success: function success(result) {
                    return resolve(result);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    }
};

},{}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class HobbyModule
 * Functionality taking API information related to hobbies from the backend and creating components.
 */
module.exports = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.api = require('./hobby.api');
    }

    return _class;
}();

},{"./hobby.api":3}],5:[function(require,module,exports){
'use strict';

/**
 * BROWSERIFY ENTRY POINT
 * This script instantiates all required modules for SocketSocial and runs a list of commands.
 */
$(document).ready(function () {

    var UserModule = require('./user/user.module');
    var EventModule = require('./event/event.module');
    var HobbyModule = require('./hobby/hobby.module');

    var USER_MODULE = new UserModule();
    var EVENT_MODULE = new EventModule();
    var HOBBY_MODULE = new HobbyModule();

    var $createUserPanel = $(' #create_user_panel ');
    var $userListPanel = $(' #admin_user_list ');

    USER_MODULE.makeCreateUserPanel($createUserPanel);
    USER_MODULE.makeUserListPanel($userListPanel);
});

},{"./event/event.module":2,"./hobby/hobby.module":4,"./user/user.module":8}],6:[function(require,module,exports){
'use strict';

module.exports = {
    createUser: function createUser(data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: '/signup',
                dataType: 'JSON',
                data: data,
                success: function success(user) {
                    return resolve(user);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    signinUser: function signinUser(data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: '/signin',
                dataType: 'JSON',
                data: data,
                success: function success(user) {
                    return resolve(user);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    },
    getUsers: function getUsers() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'GET',
                url: '/users',
                dataType: 'JSON',
                success: function success(users) {
                    return resolve(users);
                },
                error: function error(err) {
                    return reject(err);
                }
            });
        });
    }
};

},{}],7:[function(require,module,exports){
"use strict";

module.exports = {
    createUserPanelHtml: function createUserPanelHtml() {
        return "\n            <section id=\"create_user_flasher\" class=\"alert alert-success panel-alert\"></section>\n            <div class=\"panel panel-info\">\n                <header class=\"panel-heading\">\n                    <h3>\n                        <i class=\"fa fa-user\"></i><i class=\"fa fa-plus\"></i> &nbsp;Create User\n                    </h3>\n                </header>\n                <div class=\"panel-body\">\n                    <form id=\"create_user_form\" class=\"col-md-12\">\n                        <section class=\"row\">\n                            <fieldset class=\"form-group\">\n                                <label>Email</label>\n                                <input id=\"create_user_email\" type=\"email\" class=\"form-control\" required />\n                            </fieldset>\n                            <fieldset class=\"form-group\">\n                                <label>Password</label>\n                                <input id=\"create_user_password\" type=\"password\" class=\"form-control\" required />\n                            </fieldset>\n                        </section>\n                    </form>\n                </div>\n                <footer class=\"panel-footer\">\n                    <button id=\"create_user_clear\" class=\"btn btn-default\"><i class=\"fa fa-trash\"></i>\n                        Clear\n                    </button>\n                    <button id=\"create_user_submit\" class=\"btn btn-default\"><i class=\"fa fa-arrow-right\"></i>\n                        Submit\n                    </button>\n                </footer>\n            </div>\n        ";
    },
    createUserListPanelHtml: function createUserListPanelHtml() {
        return "\n            <section class=\"panel panel-info\">\n                <header class=\"panel-heading\">\n                    <h3><i class=\"fa fa-users\"></i> User List</h3>\n                </header>\n                <div class=\"panel-body user_list_panel\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <td></td>\n                                <td>User</td>\n                                <td>ID</td>\n                            </tr>\n                        </thead>\n                        <tbody class=\"user_list_rows\"></tbody>\n                    </table>\n                </div>\n                <footer class=\"panel-footer\">\n                    <section class=\"row\">\n                        <form class=\"col-md-12\">\n                            <fieldset class=\"form-group\">\n                                <input class=\"user_list_filter form-control\" type=\"text\" placeholder=\"Filter\" />\n                            </fieldset>\n                        </form>\n                    </section>\n                </footer>\n            </section>\n        ";
    }
};

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class UserModule
 * Functionality taking API information related to users from the backend and creating components.
 */
module.exports = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.api = require('./user.api');
    }

    /**
     * Attach a panel with functionality to create a new user.
     * @param {object} $container - A jQuery selector.
     */


    _createClass(_class, [{
        key: 'makeCreateUserPanel',
        value: function makeCreateUserPanel($container) {
            var _this = this;

            if (!$container) throw new Error('makeCreateUsePanel must be given a container');

            var createUserPanelHtml = require('./user.html').createUserPanelHtml;
            // TODO: Test output to check for flasher
            $container.append(createUserPanelHtml);
            // TODO: test container has panel

            var $createUserClear = $(' #create_user_clear ');
            var $createUserSubmit = $(' #create_user_submit ');

            // TODO: Test buttons exist

            $createUserClear.on('click', function (e) {
                return _this.clearCreateUser(e);
            });
            $createUserSubmit.on('click', function (e) {
                return _this.createUser(e);
            });

            // TODO: test create user clear buttom clears the user
            // TODO: test create user submit button adds the user to the db
        }

        /**
         * Clear the 'email' and 'password' fields in the 'Create User' form.
         * @param {object} e - Any passed events from an event handling method.
         */

    }, {
        key: 'clearCreateUser',
        value: function clearCreateUser(e) {
            if (e) e.preventDefault();

            var $createUserEmail = $(' #create_user_email ');
            var $createUserPassword = $(' #create_user_password ');

            // TODO: test forms exist

            $createUserEmail.val('');
            $createUserPassword.val('');

            // TODO: test forms are clear
        }

        /**
         * Using the form data, create a new user in the database.
         * @param {object} e - Any passed events from an event handling method.
         */

    }, {
        key: 'createUser',
        value: function createUser(e) {
            var _this2 = this;

            if (e) e.preventDefault();

            var $createUserFlasher = $(' #create_user_flasher ');
            var $createUserEmail = $(' #create_user_email ');
            var $createUserPassword = $(' #create_user_password ');

            var data = {
                email: $createUserEmail.val(),
                password: $createUserPassword.val()
            };

            if (!data.email.length) {
                flashCreateUserError('An email is required to join SocketSocial.');
                return false;
            }

            var isDealerSocketEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@dealersocket.com$/.test(data.email);

            if (!isDealerSocketEmail) {
                flashCreateUserError('A DealerSocket email is required to join SocketSocial. (@dealersocket.com)');
                return false;
            }

            if (data.password.length < 6) {
                flashCreateUserError('Your password must be at least six characters.');
                return false;
            }

            this.api.createUser(data).then(function (result) {
                console.log(result);
                if (result.success) {
                    var $userListPanelPanels = $(' .user_list_rows ');

                    flashCreateUserSuccess(result.success);
                    clearCreateUser();

                    _this2.updateUserListPanel($userListPanelPanels);
                } else if (result.error) {
                    flashCreateUserError(result.error);
                } else {
                    throw new Error('Unexpected data received in createUser method');
                }
            }, function (err) {
                return console.error(err);
            });

            /**
             * Show a green alert notifying the user that a new user was created.
             * @param {string} message - The message for the flasher.
             */
            function flashCreateUserSuccess(message) {
                $createUserFlasher.removeClass();
                $createUserFlasher.addClass('alert');
                $createUserFlasher.addClass('alert-success');
                $createUserFlasher.text(message);
                $createUserFlasher.fadeIn();
                setTimeout(function () {
                    $createUserFlasher.fadeOut();
                }, 3000);
            }

            /**
             * Show a red alert notifying the user that a new user was not created.
             * @param {string} message - The message for the flasher.
             */
            function flashCreateUserError(message) {
                $createUserFlasher.removeClass();
                $createUserFlasher.addClass('alert');
                $createUserFlasher.addClass('alert-danger');
                $createUserFlasher.text(message);
                $createUserFlasher.fadeIn();
                setTimeout(function () {
                    $createUserFlasher.fadeOut();
                }, 3000);
            }

            /**
             * Clear the 'email' and 'password' fields in the 'Create User' form.
             * @param {object} e - Any passed events from an event handling method.
             */
            function clearCreateUser(e) {
                if (e) e.preventDefault();
                $createUserEmail.val('');
                $createUserPassword.val('');
            }
        }

        /**
         * Attach a panel with functionality to display a list of users.
         * @param {object} $container - A jQuery selector.
         */

    }, {
        key: 'makeUserListPanel',
        value: function makeUserListPanel($container) {
            var userListPanelHtml = require('./user.html').createUserListPanelHtml;

            $container.append(userListPanelHtml);

            var $userListPanel = $(' .user_list_rows ');

            this.updateUserListPanel($userListPanel);
        }

        /**
         * Clear a user list, get all users from the server, then iterate over them and make table rows.
         */

    }, {
        key: 'updateUserListPanel',
        value: function updateUserListPanel($userListPanel) {
            $userListPanel.html('');

            this.api.getUsers().then(function (users) {
                for (var i = users.length - 1; i > 0; i--) {
                    var user = users[i];
                    var row = '\n                        <tr>\n                            <td>\n                                <button class="btn btn-sm btn-default">...</button>\n                            </td>\n                            <td>' + user.email + '</td>\n                            <td>' + user.id + '</td>\n                        </tr>\n                    ';

                    $userListPanel.append(row);
                }
            }, function (err) {
                return console.error(err);
            });
        }
    }]);

    return _class;
}();

},{"./user.api":6,"./user.html":7}]},{},[5]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJidW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24gY3JlYXRlRXZlbnQoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLmRhdGUgfHwgIWRhdGEubG9jYXRpb24gfHwgIWRhdGEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVFdmVudCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgZGF0ZSwgYSBsb2NhdGlvbiwgYW5kIGEgZGVzY3JpcHRpb24uJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0RXZlbnQ6IGZ1bmN0aW9uIGdldEV2ZW50KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMvJyArIGlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldEV2ZW50czogZnVuY3Rpb24gZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXZlbnRzLycsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlRXZlbnQ6IGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5pZCB8fCAhZGF0YS5kYXRlIHx8ICFkYXRhLmxvY2F0aW9uIHx8ICFkYXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXBkYXRlRXZlbnQgbXVzdCBiZSBjYWxsZWQgd2l0aCBhbiBpZCwgYSBkYXRlLCBhIGxvY2F0aW9uLCBhbmQgYSBkZXNjcmlwdGlvbi4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2V2ZW50cy8nICsgb3B0aW9ucy5pZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgRXZlbnRNb2R1bGVcbiAqIEZ1bmN0aW9uYWxpdHkgdGFraW5nIEFQSSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGV2ZW50cyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ldmVudC5hcGknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vZXZlbnQuYXBpXCI6MX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVIb2JieTogZnVuY3Rpb24gY3JlYXRlSG9iYnkoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLm5hbWUgfHwgIWRhdGEuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVIb2JieSBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgbmFtZSBhbmQgYSBjYXRlZ29yeS4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvYmJpZXMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SG9iYnk6IGZ1bmN0aW9uIGdldEhvYmJ5KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBpZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRIb2JiaWVzOiBmdW5jdGlvbiBnZXRIb2JiaWVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG9iYmllcy8nLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUhvYmJ5OiBmdW5jdGlvbiB1cGRhdGVIb2JieShkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIWRhdGEuaWQgfHwgIWRhdGEubmFtZSB8fCAhZGF0YS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZUhvYmJ5IG11c3QgYmUgY2FsbGVkIHdpdGggYW4gaWQsIGEgbmFtZSwgYW5kIGEgY2F0ZWdvcnkuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBvcHRpb25zLmlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyBIb2JieU1vZHVsZVxuICogRnVuY3Rpb25hbGl0eSB0YWtpbmcgQVBJIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gaG9iYmllcyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ob2JieS5hcGknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vaG9iYnkuYXBpXCI6M31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEJST1dTRVJJRlkgRU5UUlkgUE9JTlRcbiAqIFRoaXMgc2NyaXB0IGluc3RhbnRpYXRlcyBhbGwgcmVxdWlyZWQgbW9kdWxlcyBmb3IgU29ja2V0U29jaWFsIGFuZCBydW5zIGEgbGlzdCBvZiBjb21tYW5kcy5cbiAqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFVzZXJNb2R1bGUgPSByZXF1aXJlKCcuL3VzZXIvdXNlci5tb2R1bGUnKTtcbiAgICB2YXIgRXZlbnRNb2R1bGUgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50Lm1vZHVsZScpO1xuICAgIHZhciBIb2JieU1vZHVsZSA9IHJlcXVpcmUoJy4vaG9iYnkvaG9iYnkubW9kdWxlJyk7XG5cbiAgICB2YXIgVVNFUl9NT0RVTEUgPSBuZXcgVXNlck1vZHVsZSgpO1xuICAgIHZhciBFVkVOVF9NT0RVTEUgPSBuZXcgRXZlbnRNb2R1bGUoKTtcbiAgICB2YXIgSE9CQllfTU9EVUxFID0gbmV3IEhvYmJ5TW9kdWxlKCk7XG5cbiAgICB2YXIgJGNyZWF0ZVVzZXJQYW5lbCA9ICQoJyAjY3JlYXRlX3VzZXJfcGFuZWwgJyk7XG4gICAgdmFyICR1c2VyTGlzdFBhbmVsID0gJCgnICNhZG1pbl91c2VyX2xpc3QgJyk7XG5cbiAgICBVU0VSX01PRFVMRS5tYWtlQ3JlYXRlVXNlclBhbmVsKCRjcmVhdGVVc2VyUGFuZWwpO1xuICAgIFVTRVJfTU9EVUxFLm1ha2VVc2VyTGlzdFBhbmVsKCR1c2VyTGlzdFBhbmVsKTtcbn0pO1xuXG59LHtcIi4vZXZlbnQvZXZlbnQubW9kdWxlXCI6MixcIi4vaG9iYnkvaG9iYnkubW9kdWxlXCI6NCxcIi4vdXNlci91c2VyLm1vZHVsZVwiOjh9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlVXNlcjogZnVuY3Rpb24gY3JlYXRlVXNlcihkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2lnbmluVXNlcjogZnVuY3Rpb24gc2lnbmluVXNlcihkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbmluJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0VXNlcnM6IGZ1bmN0aW9uIGdldFVzZXJzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvdXNlcnMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2Vycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1c2Vycyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxufSx7fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlVXNlclBhbmVsSHRtbDogZnVuY3Rpb24gY3JlYXRlVXNlclBhbmVsSHRtbCgpIHtcbiAgICAgICAgcmV0dXJuIFwiXFxuICAgICAgICAgICAgPHNlY3Rpb24gaWQ9XFxcImNyZWF0ZV91c2VyX2ZsYXNoZXJcXFwiIGNsYXNzPVxcXCJhbGVydCBhbGVydC1zdWNjZXNzIHBhbmVsLWFsZXJ0XFxcIj48L3NlY3Rpb24+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGgzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS11c2VyXFxcIj48L2k+PGkgY2xhc3M9XFxcImZhIGZhLXBsdXNcXFwiPjwvaT4gJm5ic3A7Q3JlYXRlIFVzZXJcXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XFxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVxcXCJjcmVhdGVfdXNlcl9mb3JtXFxcIiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5FbWFpbDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX2VtYWlsXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX3Bhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVxcXCJwYW5lbC1mb290ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiY3JlYXRlX3VzZXJfY2xlYXJcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIENsZWFyXFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcImNyZWF0ZV91c2VyX3N1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFycm93LXJpZ2h0XFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgU3VibWl0XFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIjtcbiAgICB9LFxuICAgIGNyZWF0ZVVzZXJMaXN0UGFuZWxIdG1sOiBmdW5jdGlvbiBjcmVhdGVVc2VyTGlzdFBhbmVsSHRtbCgpIHtcbiAgICAgICAgcmV0dXJuIFwiXFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcInBhbmVsIHBhbmVsLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxoMz48aSBjbGFzcz1cXFwiZmEgZmEtdXNlcnNcXFwiPjwvaT4gVXNlciBMaXN0PC9oMz5cXG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHkgdXNlcl9saXN0X3BhbmVsXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cXFwidGFibGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+VXNlcjwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+SUQ8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVxcXCJ1c2VyX2xpc3Rfcm93c1xcXCI+PC90Ym9keT5cXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzPVxcXCJwYW5lbC1mb290ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XFxcInVzZXJfbGlzdF9maWx0ZXIgZm9ybS1jb250cm9sXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiRmlsdGVyXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XFxuICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgXCI7XG4gICAgfVxufTtcblxufSx7fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzIFVzZXJNb2R1bGVcbiAqIEZ1bmN0aW9uYWxpdHkgdGFraW5nIEFQSSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHVzZXJzIGZyb20gdGhlIGJhY2tlbmQgYW5kIGNyZWF0aW5nIGNvbXBvbmVudHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIF9jbGFzcygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIF9jbGFzcyk7XG5cbiAgICAgICAgdGhpcy5hcGkgPSByZXF1aXJlKCcuL3VzZXIuYXBpJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoIGEgcGFuZWwgd2l0aCBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSBhIG5ldyB1c2VyLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkY29udGFpbmVyIC0gQSBqUXVlcnkgc2VsZWN0b3IuXG4gICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhfY2xhc3MsIFt7XG4gICAgICAgIGtleTogJ21ha2VDcmVhdGVVc2VyUGFuZWwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbWFrZUNyZWF0ZVVzZXJQYW5lbCgkY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoISRjb250YWluZXIpIHRocm93IG5ldyBFcnJvcignbWFrZUNyZWF0ZVVzZVBhbmVsIG11c3QgYmUgZ2l2ZW4gYSBjb250YWluZXInKTtcblxuICAgICAgICAgICAgdmFyIGNyZWF0ZVVzZXJQYW5lbEh0bWwgPSByZXF1aXJlKCcuL3VzZXIuaHRtbCcpLmNyZWF0ZVVzZXJQYW5lbEh0bWw7XG4gICAgICAgICAgICAvLyBUT0RPOiBUZXN0IG91dHB1dCB0byBjaGVjayBmb3IgZmxhc2hlclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoY3JlYXRlVXNlclBhbmVsSHRtbCk7XG4gICAgICAgICAgICAvLyBUT0RPOiB0ZXN0IGNvbnRhaW5lciBoYXMgcGFuZWxcblxuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyQ2xlYXIgPSAkKCcgI2NyZWF0ZV91c2VyX2NsZWFyICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyU3VibWl0ID0gJCgnICNjcmVhdGVfdXNlcl9zdWJtaXQgJyk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IFRlc3QgYnV0dG9ucyBleGlzdFxuXG4gICAgICAgICAgICAkY3JlYXRlVXNlckNsZWFyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNsZWFyQ3JlYXRlVXNlcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGNyZWF0ZVVzZXJTdWJtaXQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY3JlYXRlVXNlcihlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiB0ZXN0IGNyZWF0ZSB1c2VyIGNsZWFyIGJ1dHRvbSBjbGVhcnMgdGhlIHVzZXJcbiAgICAgICAgICAgIC8vIFRPRE86IHRlc3QgY3JlYXRlIHVzZXIgc3VibWl0IGJ1dHRvbiBhZGRzIHRoZSB1c2VyIHRvIHRoZSBkYlxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSAnZW1haWwnIGFuZCAncGFzc3dvcmQnIGZpZWxkcyBpbiB0aGUgJ0NyZWF0ZSBVc2VyJyBmb3JtLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZSAtIEFueSBwYXNzZWQgZXZlbnRzIGZyb20gYW4gZXZlbnQgaGFuZGxpbmcgbWV0aG9kLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2xlYXJDcmVhdGVVc2VyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyQ3JlYXRlVXNlcihlKSB7XG4gICAgICAgICAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJFbWFpbCA9ICQoJyAjY3JlYXRlX3VzZXJfZW1haWwgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJQYXNzd29yZCA9ICQoJyAjY3JlYXRlX3VzZXJfcGFzc3dvcmQgJyk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IHRlc3QgZm9ybXMgZXhpc3RcblxuICAgICAgICAgICAgJGNyZWF0ZVVzZXJFbWFpbC52YWwoJycpO1xuICAgICAgICAgICAgJGNyZWF0ZVVzZXJQYXNzd29yZC52YWwoJycpO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiB0ZXN0IGZvcm1zIGFyZSBjbGVhclxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzaW5nIHRoZSBmb3JtIGRhdGEsIGNyZWF0ZSBhIG5ldyB1c2VyIGluIHRoZSBkYXRhYmFzZS5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGUgLSBBbnkgcGFzc2VkIGV2ZW50cyBmcm9tIGFuIGV2ZW50IGhhbmRsaW5nIG1ldGhvZC5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NyZWF0ZVVzZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlVXNlcihlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyRmxhc2hlciA9ICQoJyAjY3JlYXRlX3VzZXJfZmxhc2hlciAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlckVtYWlsID0gJCgnICNjcmVhdGVfdXNlcl9lbWFpbCAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlclBhc3N3b3JkID0gJCgnICNjcmVhdGVfdXNlcl9wYXNzd29yZCAnKTtcblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICRjcmVhdGVVc2VyRW1haWwudmFsKCksXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRjcmVhdGVVc2VyUGFzc3dvcmQudmFsKClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghZGF0YS5lbWFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmbGFzaENyZWF0ZVVzZXJFcnJvcignQW4gZW1haWwgaXMgcmVxdWlyZWQgdG8gam9pbiBTb2NrZXRTb2NpYWwuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaXNEZWFsZXJTb2NrZXRFbWFpbCA9IC9eWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSsoXFwuWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSspKkBkZWFsZXJzb2NrZXQuY29tJC8udGVzdChkYXRhLmVtYWlsKTtcblxuICAgICAgICAgICAgaWYgKCFpc0RlYWxlclNvY2tldEVtYWlsKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IoJ0EgRGVhbGVyU29ja2V0IGVtYWlsIGlzIHJlcXVpcmVkIHRvIGpvaW4gU29ja2V0U29jaWFsLiAoQGRlYWxlcnNvY2tldC5jb20pJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXNzd29yZC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IoJ1lvdXIgcGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCBzaXggY2hhcmFjdGVycy4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmNyZWF0ZVVzZXIoZGF0YSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICR1c2VyTGlzdFBhbmVsUGFuZWxzID0gJCgnIC51c2VyX2xpc3Rfcm93cyAnKTtcblxuICAgICAgICAgICAgICAgICAgICBmbGFzaENyZWF0ZVVzZXJTdWNjZXNzKHJlc3VsdC5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDcmVhdGVVc2VyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnVwZGF0ZVVzZXJMaXN0UGFuZWwoJHVzZXJMaXN0UGFuZWxQYW5lbHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsYXNoQ3JlYXRlVXNlckVycm9yKHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGRhdGEgcmVjZWl2ZWQgaW4gY3JlYXRlVXNlciBtZXRob2QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNob3cgYSBncmVlbiBhbGVydCBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCBhIG5ldyB1c2VyIHdhcyBjcmVhdGVkLlxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSBmb3IgdGhlIGZsYXNoZXIuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZsYXNoQ3JlYXRlVXNlclN1Y2Nlc3MobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5hZGRDbGFzcygnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuYWRkQ2xhc3MoJ2FsZXJ0LXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIudGV4dChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2hvdyBhIHJlZCBhbGVydCBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCBhIG5ldyB1c2VyIHdhcyBub3QgY3JlYXRlZC5cbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgZm9yIHRoZSBmbGFzaGVyLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBmbGFzaENyZWF0ZVVzZXJFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmFkZENsYXNzKCdhbGVydCcpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5hZGRDbGFzcygnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLnRleHQobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmZhZGVJbigpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENsZWFyIHRoZSAnZW1haWwnIGFuZCAncGFzc3dvcmQnIGZpZWxkcyBpbiB0aGUgJ0NyZWF0ZSBVc2VyJyBmb3JtLlxuICAgICAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGUgLSBBbnkgcGFzc2VkIGV2ZW50cyBmcm9tIGFuIGV2ZW50IGhhbmRsaW5nIG1ldGhvZC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJDcmVhdGVVc2VyKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRW1haWwudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlclBhc3N3b3JkLnZhbCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQXR0YWNoIGEgcGFuZWwgd2l0aCBmdW5jdGlvbmFsaXR5IHRvIGRpc3BsYXkgYSBsaXN0IG9mIHVzZXJzLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gJGNvbnRhaW5lciAtIEEgalF1ZXJ5IHNlbGVjdG9yLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbWFrZVVzZXJMaXN0UGFuZWwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbWFrZVVzZXJMaXN0UGFuZWwoJGNvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIHVzZXJMaXN0UGFuZWxIdG1sID0gcmVxdWlyZSgnLi91c2VyLmh0bWwnKS5jcmVhdGVVc2VyTGlzdFBhbmVsSHRtbDtcblxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQodXNlckxpc3RQYW5lbEh0bWwpO1xuXG4gICAgICAgICAgICB2YXIgJHVzZXJMaXN0UGFuZWwgPSAkKCcgLnVzZXJfbGlzdF9yb3dzICcpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJMaXN0UGFuZWwoJHVzZXJMaXN0UGFuZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIGEgdXNlciBsaXN0LCBnZXQgYWxsIHVzZXJzIGZyb20gdGhlIHNlcnZlciwgdGhlbiBpdGVyYXRlIG92ZXIgdGhlbSBhbmQgbWFrZSB0YWJsZSByb3dzLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAndXBkYXRlVXNlckxpc3RQYW5lbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVVc2VyTGlzdFBhbmVsKCR1c2VyTGlzdFBhbmVsKSB7XG4gICAgICAgICAgICAkdXNlckxpc3RQYW5lbC5odG1sKCcnKTtcblxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VXNlcnMoKS50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB1c2Vycy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gdXNlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSAnXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiPi4uLjwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JyArIHVzZXIuZW1haWwgKyAnPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPicgKyB1c2VyLmlkICsgJzwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICAgICAgICAgICc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHVzZXJMaXN0UGFuZWwuYXBwZW5kKHJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBfY2xhc3M7XG59KCk7XG5cbn0se1wiLi91c2VyLmFwaVwiOjYsXCIuL3VzZXIuaHRtbFwiOjd9XX0se30sWzVdKTtcbiJdLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
