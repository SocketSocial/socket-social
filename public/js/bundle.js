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
    var $memberList = $(' #member_list ');
    var $memberDetail = $(' #member_detail ');

    // Admin
    USER_MODULE.makeCreateUserPanel($createUserPanel);
    USER_MODULE.makeUserListPanel($userListPanel);

    // Members
    USER_MODULE.makeMemberHobbyList($memberList, $memberDetail);
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
        return "\n            <section id=\"create_user_flasher\" class=\"alert alert-success panel-alert\"></section>\n            <div class=\"panel panel-info\">\n                <header class=\"panel-heading\">\n                    <h3>\n                        <i class=\"fa fa-user\"></i><i class=\"fa fa-plus\"></i> &nbsp;Create User\n                    </h3>\n                </header>\n                <div class=\"panel-body\">\n                    <form id=\"create_user_form\" class=\"col-md-12\">\n                        <section class=\"row\">\n                            <fieldset class=\"form-group\">\n                                <label>Name</label>\n                                <input id=\"create_user_name\" type=\"email\" class=\"form-control\" required />\n                            </fieldset>\n                            <fieldset class=\"form-group\">\n                                <label>Email</label>\n                                <input id=\"create_user_email\" type=\"email\" class=\"form-control\" required />\n                            </fieldset>\n                            <fieldset class=\"form-group\">\n                                <label>Password</label>\n                                <input id=\"create_user_password\" type=\"password\" class=\"form-control\" required />\n                            </fieldset>\n                        </section>\n                    </form>\n                </div>\n                <footer class=\"panel-footer\">\n                    <button id=\"create_user_clear\" class=\"btn btn-default\"><i class=\"fa fa-trash\"></i>\n                        Clear\n                    </button>\n                    <button id=\"create_user_submit\" class=\"btn btn-default\"><i class=\"fa fa-arrow-right\"></i>\n                        Submit\n                    </button>\n                </footer>\n            </div>\n        ";
    },
    createUserListPanelHtml: function createUserListPanelHtml() {
        return "\n            <section class=\"panel panel-info\">\n                <header class=\"panel-heading\">\n                    <h3><i class=\"fa fa-users\"></i> User List</h3>\n                </header>\n                <div class=\"panel-body user_list_panel\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <td></td>\n                                <td>User</td>\n                                <td>ID</td>\n                            </tr>\n                        </thead>\n                        <tbody class=\"user_list_rows\"></tbody>\n                    </table>\n                </div>\n                <footer class=\"panel-footer\">\n                    <section class=\"row\">\n                        <form class=\"col-md-12\">\n                            <fieldset class=\"form-group\">\n                                <input class=\"user_list_filter form-control\" type=\"text\" placeholder=\"Filter\" />\n                            </fieldset>\n                        </form>\n                    </section>\n                </footer>\n            </section>\n        ";
    },
    createMemberProfileCardHtml: function createMemberProfileCardHtml(name, email) {
        return "\n            <div class=\"member_profile_card\">\n                <section class=\"row\">\n                    <div class=\"row\">\n                        <section class=\"col-md-4\">\n                            <img src=\"http://placehold.it/220x220\" class=\"img-responsive center-block\">\n                        </section>\n                        <sectiom class=\"col-md-8\">\n                            <h3>" + name + "</h3>\n                            <h4>" + email + "</h4>\n                            <br />\n                            <span>\n                                <i class=\"fa fa-2x fa-facebook\"></i>\n                                &nbsp;\n                                <i class=\"fa fa-2x fa-twitter\"></i>\n                            </span>\n                        </sectiom>\n                    </div>\n                    <div class=\"row\">\n                        <section class=\"col-md-12\">\n                            <hr />\n                        </section>\n                    </div>\n                    <div class=\"row\">\n                        <section class=\"col-md-12 member_info\">\n                            <label>Title</label>\n                            <p>Some Title</p>\n                            <br />\n                            <label>About me</label>\n                            <p>Lorem ipsum</p>\n                            <br />\n                            <label>Hobbies</label>\n                            <p>Hobbies</p>\n                        </section>\n                    </div>\n                </section>\n            </div>\n        ";
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
            var _this2 = this;

            if (!$container) throw new Error('makeCreateUsePanel must be given a container');

            var createUserPanelHtml = require('./user.html').createUserPanelHtml;
            // TODO: Test output to check for flasher
            $container.append(createUserPanelHtml);
            // TODO: test container has panel

            var $createUserClear = $(' #create_user_clear ');
            var $createUserSubmit = $(' #create_user_submit ');

            // TODO: Test buttons exist

            $createUserClear.on('click', function (e) {
                return _this2.clearCreateUser(e);
            });
            $createUserSubmit.on('click', function (e) {
                return _this2.createUser(e);
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
            $createUserName.val('');
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
            var _this3 = this;

            if (e) e.preventDefault();

            var $createUserFlasher = $(' #create_user_flasher ');
            var $createUserName = $(' #create_user_name ');
            var $createUserEmail = $(' #create_user_email ');
            var $createUserPassword = $(' #create_user_password ');

            var data = {
                name: $createUserName.val(),
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

                    _this3.updateUserListPanel($userListPanelPanels);
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

        /**
         *
         * @param {object} $container - A jQuery selector (tbody).
         * @param {object} $detailContainer - Another selector for detail view.
         */

    }, {
        key: 'makeMemberHobbyList',
        value: function makeMemberHobbyList($container, $detailContainer) {
            var _this = this;

            this.api.getUsers().then(function (users) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = users[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var user = _step.value;

                        var id = user.id;
                        var name = user.name;
                        var email = user.email;

                        var row = '\n                        <tr class="member_row" data-id="' + id + '" data-name="' + name + '" data-email="' + email + '">\n                            <td>' + name + '</td>\n                            <td>' + email + '</td>\n                        </tr>\n                    ';

                        $container.append(row);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var $memberRow = $(' .member_row ');

                $memberRow.each(function () {
                    var _this4 = this;

                    $(this).on('click', function () {
                        _this.makeMemberProfileCard($(_this4), $detailContainer);
                    });
                });
            }, function (err) {
                return console.error({ err: err });
            });
        }

        /**
         * @param {object} $memberRow - A row with data attributes.
         * @param {object} $detailContainer - A jQuery selector.
         */

    }, {
        key: 'makeMemberProfileCard',
        value: function makeMemberProfileCard($memberRow, $detailContainer) {
            var id = $memberRow.attr('data-id');
            var name = $memberRow.attr('data-name');
            var email = $memberRow.attr('data-email');

            var memberProfileCardHtml = require('./user.html').createMemberProfileCardHtml(name, email);

            $detailContainer.html('');

            $detailContainer.append(memberProfileCardHtml);
        }
    }]);

    return _class;
}();

},{"./user.api":6,"./user.html":7}]},{},[5]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJidW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24gY3JlYXRlRXZlbnQoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLmRhdGUgfHwgIWRhdGEubG9jYXRpb24gfHwgIWRhdGEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVFdmVudCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgZGF0ZSwgYSBsb2NhdGlvbiwgYW5kIGEgZGVzY3JpcHRpb24uJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0RXZlbnQ6IGZ1bmN0aW9uIGdldEV2ZW50KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMvJyArIGlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldEV2ZW50czogZnVuY3Rpb24gZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXZlbnRzLycsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlRXZlbnQ6IGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5pZCB8fCAhZGF0YS5kYXRlIHx8ICFkYXRhLmxvY2F0aW9uIHx8ICFkYXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXBkYXRlRXZlbnQgbXVzdCBiZSBjYWxsZWQgd2l0aCBhbiBpZCwgYSBkYXRlLCBhIGxvY2F0aW9uLCBhbmQgYSBkZXNjcmlwdGlvbi4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2V2ZW50cy8nICsgb3B0aW9ucy5pZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgRXZlbnRNb2R1bGVcbiAqIEZ1bmN0aW9uYWxpdHkgdGFraW5nIEFQSSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGV2ZW50cyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ldmVudC5hcGknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vZXZlbnQuYXBpXCI6MX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVIb2JieTogZnVuY3Rpb24gY3JlYXRlSG9iYnkoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLm5hbWUgfHwgIWRhdGEuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVIb2JieSBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgbmFtZSBhbmQgYSBjYXRlZ29yeS4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvYmJpZXMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SG9iYnk6IGZ1bmN0aW9uIGdldEhvYmJ5KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBpZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRIb2JiaWVzOiBmdW5jdGlvbiBnZXRIb2JiaWVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG9iYmllcy8nLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUhvYmJ5OiBmdW5jdGlvbiB1cGRhdGVIb2JieShkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIWRhdGEuaWQgfHwgIWRhdGEubmFtZSB8fCAhZGF0YS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZUhvYmJ5IG11c3QgYmUgY2FsbGVkIHdpdGggYW4gaWQsIGEgbmFtZSwgYW5kIGEgY2F0ZWdvcnkuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBvcHRpb25zLmlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyBIb2JieU1vZHVsZVxuICogRnVuY3Rpb25hbGl0eSB0YWtpbmcgQVBJIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gaG9iYmllcyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ob2JieS5hcGknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vaG9iYnkuYXBpXCI6M31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEJST1dTRVJJRlkgRU5UUlkgUE9JTlRcbiAqIFRoaXMgc2NyaXB0IGluc3RhbnRpYXRlcyBhbGwgcmVxdWlyZWQgbW9kdWxlcyBmb3IgU29ja2V0U29jaWFsIGFuZCBydW5zIGEgbGlzdCBvZiBjb21tYW5kcy5cbiAqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFVzZXJNb2R1bGUgPSByZXF1aXJlKCcuL3VzZXIvdXNlci5tb2R1bGUnKTtcbiAgICB2YXIgRXZlbnRNb2R1bGUgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50Lm1vZHVsZScpO1xuICAgIHZhciBIb2JieU1vZHVsZSA9IHJlcXVpcmUoJy4vaG9iYnkvaG9iYnkubW9kdWxlJyk7XG5cbiAgICB2YXIgVVNFUl9NT0RVTEUgPSBuZXcgVXNlck1vZHVsZSgpO1xuICAgIHZhciBFVkVOVF9NT0RVTEUgPSBuZXcgRXZlbnRNb2R1bGUoKTtcbiAgICB2YXIgSE9CQllfTU9EVUxFID0gbmV3IEhvYmJ5TW9kdWxlKCk7XG5cbiAgICB2YXIgJGNyZWF0ZVVzZXJQYW5lbCA9ICQoJyAjY3JlYXRlX3VzZXJfcGFuZWwgJyk7XG4gICAgdmFyICR1c2VyTGlzdFBhbmVsID0gJCgnICNhZG1pbl91c2VyX2xpc3QgJyk7XG4gICAgdmFyICRtZW1iZXJMaXN0ID0gJCgnICNtZW1iZXJfbGlzdCAnKTtcbiAgICB2YXIgJG1lbWJlckRldGFpbCA9ICQoJyAjbWVtYmVyX2RldGFpbCAnKTtcblxuICAgIC8vIEFkbWluXG4gICAgVVNFUl9NT0RVTEUubWFrZUNyZWF0ZVVzZXJQYW5lbCgkY3JlYXRlVXNlclBhbmVsKTtcbiAgICBVU0VSX01PRFVMRS5tYWtlVXNlckxpc3RQYW5lbCgkdXNlckxpc3RQYW5lbCk7XG5cbiAgICAvLyBNZW1iZXJzXG4gICAgVVNFUl9NT0RVTEUubWFrZU1lbWJlckhvYmJ5TGlzdCgkbWVtYmVyTGlzdCwgJG1lbWJlckRldGFpbCk7XG59KTtcblxufSx7XCIuL2V2ZW50L2V2ZW50Lm1vZHVsZVwiOjIsXCIuL2hvYmJ5L2hvYmJ5Lm1vZHVsZVwiOjQsXCIuL3VzZXIvdXNlci5tb2R1bGVcIjo4fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZVVzZXI6IGZ1bmN0aW9uIGNyZWF0ZVVzZXIoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3ModXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNpZ25pblVzZXI6IGZ1bmN0aW9uIHNpZ25pblVzZXIoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ25pbicsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3ModXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFVzZXJzOiBmdW5jdGlvbiBnZXRVc2VycygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL3VzZXJzJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3ModXNlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodXNlcnMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZVVzZXJQYW5lbEh0bWw6IGZ1bmN0aW9uIGNyZWF0ZVVzZXJQYW5lbEh0bWwoKSB7XG4gICAgICAgIHJldHVybiBcIlxcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkPVxcXCJjcmVhdGVfdXNlcl9mbGFzaGVyXFxcIiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtc3VjY2VzcyBwYW5lbC1hbGVydFxcXCI+PC9zZWN0aW9uPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxoMz5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdXNlclxcXCI+PC9pPjxpIGNsYXNzPVxcXCJmYSBmYS1wbHVzXFxcIj48L2k+ICZuYnNwO0NyZWF0ZSBVc2VyXFxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxcbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cXFwiY3JlYXRlX3VzZXJfZm9ybVxcXCIgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+TmFtZTwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX25hbWVcXFwiIHR5cGU9XFxcImVtYWlsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiByZXF1aXJlZCAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkVtYWlsPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwiY3JlYXRlX3VzZXJfZW1haWxcXFwiIHR5cGU9XFxcImVtYWlsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiByZXF1aXJlZCAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlBhc3N3b3JkPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwiY3JlYXRlX3VzZXJfcGFzc3dvcmRcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiByZXF1aXJlZCAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XFxcInBhbmVsLWZvb3RlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJjcmVhdGVfdXNlcl9jbGVhclxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xlYXJcXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiY3JlYXRlX3VzZXJfc3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYXJyb3ctcmlnaHRcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICBTdWJtaXRcXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiO1xuICAgIH0sXG4gICAgY3JlYXRlVXNlckxpc3RQYW5lbEh0bWw6IGZ1bmN0aW9uIGNyZWF0ZVVzZXJMaXN0UGFuZWxIdG1sKCkge1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgIDxoZWFkZXIgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGgzPjxpIGNsYXNzPVxcXCJmYSBmYS11c2Vyc1xcXCI+PC9pPiBVc2VyIExpc3Q8L2gzPlxcbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keSB1c2VyX2xpc3RfcGFuZWxcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVxcXCJ0YWJsZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5Vc2VyPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5JRDwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XFxcInVzZXJfbGlzdF9yb3dzXFxcIj48L3Rib2R5PlxcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XFxcInBhbmVsLWZvb3RlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cXFwidXNlcl9saXN0X2ZpbHRlciBmb3JtLWNvbnRyb2xcXFwiIHR5cGU9XFxcInRleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCJGaWx0ZXJcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cXG4gICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICBcIjtcbiAgICB9LFxuICAgIGNyZWF0ZU1lbWJlclByb2ZpbGVDYXJkSHRtbDogZnVuY3Rpb24gY3JlYXRlTWVtYmVyUHJvZmlsZUNhcmRIdG1sKG5hbWUsIGVtYWlsKSB7XG4gICAgICAgIHJldHVybiBcIlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1lbWJlcl9wcm9maWxlX2NhcmRcXFwiPlxcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcImNvbC1tZC00XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XFxcImh0dHA6Ly9wbGFjZWhvbGQuaXQvMjIweDIyMFxcXCIgY2xhc3M9XFxcImltZy1yZXNwb25zaXZlIGNlbnRlci1ibG9ja1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9tIGNsYXNzPVxcXCJjb2wtbWQtOFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5cIiArIG5hbWUgKyBcIjwvaDM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5cIiArIGVtYWlsICsgXCI8L2g0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtMnggZmEtZmFjZWJvb2tcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwO1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLTJ4IGZhLXR3aXR0ZXJcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbT5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhyIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJjb2wtbWQtMTIgbWVtYmVyX2luZm9cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+VGl0bGU8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Tb21lIFRpdGxlPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFib3V0IG1lPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+TG9yZW0gaXBzdW08L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+SG9iYmllczwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkhvYmJpZXM8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiO1xuICAgIH1cbn07XG5cbn0se31dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyBVc2VyTW9kdWxlXG4gKiBGdW5jdGlvbmFsaXR5IHRha2luZyBBUEkgaW5mb3JtYXRpb24gcmVsYXRlZCB0byB1c2VycyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi91c2VyLmFwaScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIHBhbmVsIHdpdGggZnVuY3Rpb25hbGl0eSB0byBjcmVhdGUgYSBuZXcgdXNlci5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gJGNvbnRhaW5lciAtIEEgalF1ZXJ5IHNlbGVjdG9yLlxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoX2NsYXNzLCBbe1xuICAgICAgICBrZXk6ICdtYWtlQ3JlYXRlVXNlclBhbmVsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VDcmVhdGVVc2VyUGFuZWwoJGNvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICghJGNvbnRhaW5lcikgdGhyb3cgbmV3IEVycm9yKCdtYWtlQ3JlYXRlVXNlUGFuZWwgbXVzdCBiZSBnaXZlbiBhIGNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICB2YXIgY3JlYXRlVXNlclBhbmVsSHRtbCA9IHJlcXVpcmUoJy4vdXNlci5odG1sJykuY3JlYXRlVXNlclBhbmVsSHRtbDtcbiAgICAgICAgICAgIC8vIFRPRE86IFRlc3Qgb3V0cHV0IHRvIGNoZWNrIGZvciBmbGFzaGVyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZChjcmVhdGVVc2VyUGFuZWxIdG1sKTtcbiAgICAgICAgICAgIC8vIFRPRE86IHRlc3QgY29udGFpbmVyIGhhcyBwYW5lbFxuXG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJDbGVhciA9ICQoJyAjY3JlYXRlX3VzZXJfY2xlYXIgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJTdWJtaXQgPSAkKCcgI2NyZWF0ZV91c2VyX3N1Ym1pdCAnKTtcblxuICAgICAgICAgICAgLy8gVE9ETzogVGVzdCBidXR0b25zIGV4aXN0XG5cbiAgICAgICAgICAgICRjcmVhdGVVc2VyQ2xlYXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmNsZWFyQ3JlYXRlVXNlcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGNyZWF0ZVVzZXJTdWJtaXQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmNyZWF0ZVVzZXIoZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gVE9ETzogdGVzdCBjcmVhdGUgdXNlciBjbGVhciBidXR0b20gY2xlYXJzIHRoZSB1c2VyXG4gICAgICAgICAgICAvLyBUT0RPOiB0ZXN0IGNyZWF0ZSB1c2VyIHN1Ym1pdCBidXR0b24gYWRkcyB0aGUgdXNlciB0byB0aGUgZGJcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhciB0aGUgJ2VtYWlsJyBhbmQgJ3Bhc3N3b3JkJyBmaWVsZHMgaW4gdGhlICdDcmVhdGUgVXNlcicgZm9ybS5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGUgLSBBbnkgcGFzc2VkIGV2ZW50cyBmcm9tIGFuIGV2ZW50IGhhbmRsaW5nIG1ldGhvZC5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NsZWFyQ3JlYXRlVXNlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhckNyZWF0ZVVzZXIoZSkge1xuICAgICAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyRW1haWwgPSAkKCcgI2NyZWF0ZV91c2VyX2VtYWlsICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyUGFzc3dvcmQgPSAkKCcgI2NyZWF0ZV91c2VyX3Bhc3N3b3JkICcpO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiB0ZXN0IGZvcm1zIGV4aXN0XG4gICAgICAgICAgICAkY3JlYXRlVXNlck5hbWUudmFsKCcnKTtcbiAgICAgICAgICAgICRjcmVhdGVVc2VyRW1haWwudmFsKCcnKTtcbiAgICAgICAgICAgICRjcmVhdGVVc2VyUGFzc3dvcmQudmFsKCcnKTtcblxuICAgICAgICAgICAgLy8gVE9ETzogdGVzdCBmb3JtcyBhcmUgY2xlYXJcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2luZyB0aGUgZm9ybSBkYXRhLCBjcmVhdGUgYSBuZXcgdXNlciBpbiB0aGUgZGF0YWJhc2UuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIC0gQW55IHBhc3NlZCBldmVudHMgZnJvbSBhbiBldmVudCBoYW5kbGluZyBtZXRob2QuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjcmVhdGVVc2VyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVVzZXIoZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlckZsYXNoZXIgPSAkKCcgI2NyZWF0ZV91c2VyX2ZsYXNoZXIgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJOYW1lID0gJCgnICNjcmVhdGVfdXNlcl9uYW1lICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyRW1haWwgPSAkKCcgI2NyZWF0ZV91c2VyX2VtYWlsICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyUGFzc3dvcmQgPSAkKCcgI2NyZWF0ZV91c2VyX3Bhc3N3b3JkICcpO1xuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkY3JlYXRlVXNlck5hbWUudmFsKCksXG4gICAgICAgICAgICAgICAgZW1haWw6ICRjcmVhdGVVc2VyRW1haWwudmFsKCksXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRjcmVhdGVVc2VyUGFzc3dvcmQudmFsKClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghZGF0YS5lbWFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmbGFzaENyZWF0ZVVzZXJFcnJvcignQW4gZW1haWwgaXMgcmVxdWlyZWQgdG8gam9pbiBTb2NrZXRTb2NpYWwuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaXNEZWFsZXJTb2NrZXRFbWFpbCA9IC9eWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSsoXFwuWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSspKkBkZWFsZXJzb2NrZXQuY29tJC8udGVzdChkYXRhLmVtYWlsKTtcblxuICAgICAgICAgICAgaWYgKCFpc0RlYWxlclNvY2tldEVtYWlsKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IoJ0EgRGVhbGVyU29ja2V0IGVtYWlsIGlzIHJlcXVpcmVkIHRvIGpvaW4gU29ja2V0U29jaWFsLiAoQGRlYWxlcnNvY2tldC5jb20pJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXNzd29yZC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IoJ1lvdXIgcGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCBzaXggY2hhcmFjdGVycy4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmNyZWF0ZVVzZXIoZGF0YSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICR1c2VyTGlzdFBhbmVsUGFuZWxzID0gJCgnIC51c2VyX2xpc3Rfcm93cyAnKTtcblxuICAgICAgICAgICAgICAgICAgICBmbGFzaENyZWF0ZVVzZXJTdWNjZXNzKHJlc3VsdC5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDcmVhdGVVc2VyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnVwZGF0ZVVzZXJMaXN0UGFuZWwoJHVzZXJMaXN0UGFuZWxQYW5lbHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsYXNoQ3JlYXRlVXNlckVycm9yKHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGRhdGEgcmVjZWl2ZWQgaW4gY3JlYXRlVXNlciBtZXRob2QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNob3cgYSBncmVlbiBhbGVydCBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCBhIG5ldyB1c2VyIHdhcyBjcmVhdGVkLlxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSBmb3IgdGhlIGZsYXNoZXIuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZsYXNoQ3JlYXRlVXNlclN1Y2Nlc3MobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5hZGRDbGFzcygnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuYWRkQ2xhc3MoJ2FsZXJ0LXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIudGV4dChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2hvdyBhIHJlZCBhbGVydCBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCBhIG5ldyB1c2VyIHdhcyBub3QgY3JlYXRlZC5cbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgZm9yIHRoZSBmbGFzaGVyLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBmbGFzaENyZWF0ZVVzZXJFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmFkZENsYXNzKCdhbGVydCcpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5hZGRDbGFzcygnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLnRleHQobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmZhZGVJbigpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENsZWFyIHRoZSAnZW1haWwnIGFuZCAncGFzc3dvcmQnIGZpZWxkcyBpbiB0aGUgJ0NyZWF0ZSBVc2VyJyBmb3JtLlxuICAgICAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGUgLSBBbnkgcGFzc2VkIGV2ZW50cyBmcm9tIGFuIGV2ZW50IGhhbmRsaW5nIG1ldGhvZC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJDcmVhdGVVc2VyKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRW1haWwudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlclBhc3N3b3JkLnZhbCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQXR0YWNoIGEgcGFuZWwgd2l0aCBmdW5jdGlvbmFsaXR5IHRvIGRpc3BsYXkgYSBsaXN0IG9mIHVzZXJzLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gJGNvbnRhaW5lciAtIEEgalF1ZXJ5IHNlbGVjdG9yLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbWFrZVVzZXJMaXN0UGFuZWwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbWFrZVVzZXJMaXN0UGFuZWwoJGNvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIHVzZXJMaXN0UGFuZWxIdG1sID0gcmVxdWlyZSgnLi91c2VyLmh0bWwnKS5jcmVhdGVVc2VyTGlzdFBhbmVsSHRtbDtcblxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQodXNlckxpc3RQYW5lbEh0bWwpO1xuXG4gICAgICAgICAgICB2YXIgJHVzZXJMaXN0UGFuZWwgPSAkKCcgLnVzZXJfbGlzdF9yb3dzICcpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJMaXN0UGFuZWwoJHVzZXJMaXN0UGFuZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIGEgdXNlciBsaXN0LCBnZXQgYWxsIHVzZXJzIGZyb20gdGhlIHNlcnZlciwgdGhlbiBpdGVyYXRlIG92ZXIgdGhlbSBhbmQgbWFrZSB0YWJsZSByb3dzLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAndXBkYXRlVXNlckxpc3RQYW5lbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVVc2VyTGlzdFBhbmVsKCR1c2VyTGlzdFBhbmVsKSB7XG4gICAgICAgICAgICAkdXNlckxpc3RQYW5lbC5odG1sKCcnKTtcblxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VXNlcnMoKS50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB1c2Vycy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gdXNlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSAnXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiPi4uLjwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JyArIHVzZXIuZW1haWwgKyAnPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPicgKyB1c2VyLmlkICsgJzwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICAgICAgICAgICc7XG5cbiAgICAgICAgICAgICAgICAgICAgJHVzZXJMaXN0UGFuZWwuYXBwZW5kKHJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gJGNvbnRhaW5lciAtIEEgalF1ZXJ5IHNlbGVjdG9yICh0Ym9keSkuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkZGV0YWlsQ29udGFpbmVyIC0gQW5vdGhlciBzZWxlY3RvciBmb3IgZGV0YWlsIHZpZXcuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtYWtlTWVtYmVySG9iYnlMaXN0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VNZW1iZXJIb2JieUxpc3QoJGNvbnRhaW5lciwgJGRldGFpbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VXNlcnMoKS50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB1c2Vyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IHVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IHVzZXIuZW1haWw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSAnXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwibWVtYmVyX3Jvd1wiIGRhdGEtaWQ9XCInICsgaWQgKyAnXCIgZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCIgZGF0YS1lbWFpbD1cIicgKyBlbWFpbCArICdcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPicgKyBuYW1lICsgJzwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4nICsgZW1haWwgKyAnPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgICAgICAgICAgJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQocm93KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyICRtZW1iZXJSb3cgPSAkKCcgLm1lbWJlcl9yb3cgJyk7XG5cbiAgICAgICAgICAgICAgICAkbWVtYmVyUm93LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1ha2VNZW1iZXJQcm9maWxlQ2FyZCgkKF90aGlzNCksICRkZXRhaWxDb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcih7IGVycjogZXJyIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9ICRtZW1iZXJSb3cgLSBBIHJvdyB3aXRoIGRhdGEgYXR0cmlidXRlcy5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9ICRkZXRhaWxDb250YWluZXIgLSBBIGpRdWVyeSBzZWxlY3Rvci5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ21ha2VNZW1iZXJQcm9maWxlQ2FyZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlTWVtYmVyUHJvZmlsZUNhcmQoJG1lbWJlclJvdywgJGRldGFpbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIGlkID0gJG1lbWJlclJvdy5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICRtZW1iZXJSb3cuYXR0cignZGF0YS1uYW1lJyk7XG4gICAgICAgICAgICB2YXIgZW1haWwgPSAkbWVtYmVyUm93LmF0dHIoJ2RhdGEtZW1haWwnKTtcblxuICAgICAgICAgICAgdmFyIG1lbWJlclByb2ZpbGVDYXJkSHRtbCA9IHJlcXVpcmUoJy4vdXNlci5odG1sJykuY3JlYXRlTWVtYmVyUHJvZmlsZUNhcmRIdG1sKG5hbWUsIGVtYWlsKTtcblxuICAgICAgICAgICAgJGRldGFpbENvbnRhaW5lci5odG1sKCcnKTtcblxuICAgICAgICAgICAgJGRldGFpbENvbnRhaW5lci5hcHBlbmQobWVtYmVyUHJvZmlsZUNhcmRIdG1sKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBfY2xhc3M7XG59KCk7XG5cbn0se1wiLi91c2VyLmFwaVwiOjYsXCIuL3VzZXIuaHRtbFwiOjd9XX0se30sWzVdKTtcbiJdLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
