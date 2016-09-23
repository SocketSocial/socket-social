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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    /**
     *
     */


    _createClass(_class, [{
        key: 'makeListEventsPanel',
        value: function makeListEventsPanel($container, $detailContainer) {
            var _this = this;

            this.api.getEvents().then(function (events) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var event = _step.value;

                        var id = event.id;
                        var description = event.description;
                        var date = event.date;
                        var location = event.location;

                        var eventHtml = '\n                        <section class="col-md-3 event_panel text-center" data-id="' + id + '">\n                            <div class="panel panel-info">\n                                <header class="panel-heading">\n                                    <h3>' + date + '</h3>\n                                </header>\n                                <div class="panel-body">\n                                    <p>' + description + '</p>\n                                </div>\n                                <footer class="panel-footer">\n                                    <p>Organized by (name)</p>\n                                </footer>\n                            </div>\n                        </section>\n                    ';

                        $container.append(eventHtml);
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

                var $eventPanel = $(' .event_panel ');

                $eventPanel.each(function () {
                    var _this2 = this;

                    $(this).on('click', function () {
                        _this.makeEventCard($(_this2).attr('data-id'), $detailContainer);
                    });
                });
            });
        }

        /**
         *
         */

    }, {
        key: 'makeEventCard',
        value: function makeEventCard(id, $detailContainer) {
            $detailContainer.html('');

            this.api.getEvent(id).then(function (data) {
                var event = data.event;
                var description = event.description;
                var date = event.date;
                var location = event.location;

                var $eventDetailOptions = $(' .event_detail_options ');

                var eventCardHtml = '\n                    <section class="row text-center">\n                        <div class="col-xs-12 col-md-4">\n                            <h2>Information</h2>\n                            <p>' + description + '</p>\n                            <p>Organized by (name)</p>\n                        </div>\n                        <div class="col-xs-12 col-md-4">\n                            <h2>Participants</h2>\n                        </div>\n                        <div class="col-xs-12 col-md-4">\n                            <h2>Location</h2>\n                            <p>' + location + '</p>\n                        </div>\n                    </section>\n                ';

                $detailContainer.append(eventCardHtml);

                $eventDetailOptions.show();
            });
        }

        /**
         *
         */

    }, {
        key: 'makeCreateEventPanel',
        value: function makeCreateEventPanel($container) {
            var _this3 = this;

            var $createEventDescription = $(' #create_event_description ');
            var $createEventLocation = $(' #create_event_location ');
            var $createEventDate = $(' #create_event_date ');
            var $createEventSubmit = $(' #create_event_submit ');
            var $createEventClear = $(' #create_event_clear ');

            $createEventSubmit.on('click', function () {
                var data = {
                    description: $createEventDescription.val(),
                    location: $createEventLocation.val(),
                    date: $createEventDate.val()
                };

                _this3.api.createEvent(data).then(function (event) {
                    return console.log(event);
                });
            });
        }
    }]);

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
    var $eventListPanel = $(' #event_list_panel ');
    var $createEventPanel = $(' #create_event_panel ');
    var $eventDetail = $(' #event_detail ');

    // Admin
    USER_MODULE.makeCreateUserPanel($createUserPanel);
    USER_MODULE.makeUserListPanel($userListPanel);

    // Events
    EVENT_MODULE.makeCreateEventPanel($createEventPanel);
    EVENT_MODULE.makeListEventsPanel($eventListPanel, $eventDetail);

    // Members
    USER_MODULE.makeMemberHobbyList($memberList, $memberDetail);
    USER_MODULE.signinUser();
    USER_MODULE.signupUser();

    // Logo
    var $logo = $(' .logo ');

    $logo.on('click', function (e) {
        e.preventDefault();

        window.location.href = '/';
    });

    // Random member fab
    var $randomMemberFab = $(' #random_member_fab ');

    $randomMemberFab.tooltip();

    if ($randomMemberFab.length > 0) {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.info('As with most modern web sites, SocketSocial uses cookies to track session information.');
    }

    // Sign out
    var $signoutUser = $(' #signout_user ');

    $signoutUser.on('click', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/signout',
            success: function success(user) {
                window.location.href = '/';
            },
            error: function error(err) {
                return console.error(err);
            }
        });
    });

    // Tooltips
    var $navbarLinks = $(' .navbar_link ');

    $navbarLinks.tooltip({
        my: "left-25 bottom",
        at: "center"
    });

    //
    var $ejsIsSignedIn = $(' #ejs_isSignedIn ');
    var $eventDetailWrapper = $(' .event_detail_wrapper ');

    if ($ejsIsSignedIn.val()) $eventDetailWrapper.show();
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
    },
    getUserInformation: function getUserInformation(id, fields) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: '/users/' + id + '/info',
                dataType: 'JSON',
                data: {
                    fields: fields
                },
                success: function success(info) {
                    return resolve(info);
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
        return "\n            <section id=\"create_user_flasher\" class=\"alert alert-success panel-alert\"></section>\n            <div class=\"panel panel-info\">\n                <header class=\"panel-heading\">\n                    <h3>\n                        <i class=\"fa fa-user\"></i><i class=\"fa fa-plus\"></i> &nbsp;Create User\n                    </h3>\n                </header>\n                <div class=\"panel-body\">\n                    <form id=\"create_user_form\" class=\"col-md-12\">\n                        <section class=\"row\">\n                            <fieldset class=\"form-group\">\n                                <label>Name</label>\n                                <input id=\"create_user_name\" type=\"email\" class=\"form-control\" required />\n                            </fieldset>\n                            <fieldset class=\"form-group\">\n                                <label>Email</label>\n                                <input id=\"create_user_email\" type=\"email\" class=\"form-control\" required />\n                            </fieldset>\n                            <fieldset class=\"form-group\">\n                                <label>Password</label>\n                                <input id=\"create_user_password\" type=\"password\" class=\"form-control\" required />\n                            </fieldset>\n                            <fieldset class=\"form-group\">\n                                <label>Title</label>\n                                <input id=\"create_user_title\" type=\"text\" class=\"form-control\" />\n                            </fieldset>\n                            <fieldset class=\"form-group\">\n                                <label>About me</label>\n                                <input id=\"create_user_about_me\" type=\"text\" class=\"form-control\" />\n                            </fieldset>\n                        </section>\n                    </form>\n                </div>\n                <footer class=\"panel-footer\">\n                    <button id=\"create_user_clear\" class=\"btn btn-default\"><i class=\"fa fa-trash\"></i>\n                        Clear\n                    </button>\n                    <button id=\"create_user_submit\" class=\"btn btn-default\"><i class=\"fa fa-arrow-right\"></i>\n                        Submit\n                    </button>\n                </footer>\n            </div>\n        ";
    },
    createUserListPanelHtml: function createUserListPanelHtml() {
        return "\n            <section class=\"panel panel-info\">\n                <header class=\"panel-heading\">\n                    <h3><i class=\"fa fa-users\"></i> User List</h3>\n                </header>\n                <div class=\"panel-body user_list_panel\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <td></td>\n                                <td>User</td>\n                                <td>ID</td>\n                            </tr>\n                        </thead>\n                        <tbody class=\"user_list_rows\"></tbody>\n                    </table>\n                </div>\n                <footer class=\"panel-footer\">\n                    <section class=\"row\">\n                        <form class=\"col-md-12\">\n                            <fieldset class=\"form-group\">\n                                <input class=\"user_list_filter form-control\" type=\"text\" placeholder=\"Filter\" />\n                            </fieldset>\n                        </form>\n                    </section>\n                </footer>\n            </section>\n        ";
    },
    createMemberProfileCardHtml: function createMemberProfileCardHtml(options) {
        return "\n            <div class=\"member_profile_card\">\n                <section class=\"row\">\n                    <div class=\"row\">\n                        <section class=\"col-xs-12 col-md-4\">\n                            <img src=\"http://placehold.it/220x220\" class=\"img-responsive center-block\">\n                        </section>\n                        <section class=\"xs-middle col-xs-12 col-md-8\">\n                            <h3>" + options.name + "</h3>\n                            <h4>" + options.email + "</h4>\n                            <br />\n                            <span>\n                                <i class=\"fa fa-2x fa-facebook\"></i>\n                                &nbsp;\n                                <i class=\"fa fa-2x fa-twitter\"></i>\n                            </span>\n                        </section>\n                    </div>\n                    <div class=\"row\">\n                        <section class=\"col-md-12\">\n                            <hr />\n                        </section>\n                    </div>\n                    <div class=\"row\">\n                        <section class=\"col-md-12 member_info\">\n                            <label>Title</label>\n                            <p>" + options.title + "</p>\n                            <br />\n                            <label>About me</label>\n                            <p>" + options.aboutMe + "</p>\n                            <br />\n                            <label>Hobbies</label>\n                            <p>Hobbies</p>\n                        </section>\n                    </div>\n                </section>\n            </div>\n        ";
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

            var $createUserName = $(' #create_user_name ');
            var $createUserEmail = $(' #create_user_email ');
            var $createUserPassword = $(' #create_user_password ');
            var $createUserTitle = $(' #create_user_title ');
            var $createUserAboutMe = $(' #create_user_about_me ');

            $createUserName.val('');
            $createUserEmail.val('');
            $createUserPassword.val('');
            $createUserTitle.val('');
            $createUserAboutMe.val('');
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
            var $createUserTitle = $(' #create_user_title ');
            var $createUserAboutMe = $(' #create_user_about_me ');

            var data = {
                name: $createUserName.val(),
                email: $createUserEmail.val(),
                password: $createUserPassword.val(),
                title: $createUserTitle.val() || '',
                aboutMe: $createUserAboutMe.val() || ''
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

            var infoToGet = ['title', 'aboutMe'];

            this.api.getUserInformation(id, infoToGet).then(function (result) {
                var title = result.info.title;
                var aboutMe = result.info.aboutMe;

                var options = { name: name, email: email, title: title, aboutMe: aboutMe };

                var memberProfileCardHtml = require('./user.html').createMemberProfileCardHtml(options);

                $detailContainer.html('');

                $detailContainer.append(memberProfileCardHtml);
            }, function (err) {
                return console.error(err);
            });
        }

        /**
         *
         */

    }, {
        key: 'signinUser',
        value: function signinUser() {
            var _this5 = this;

            var $signinEmail = $(' #signin_user_email ');
            var $signinPassword = $(' #signin_user_password ');
            var $signinSubmit = $(' #signin_user_submit ');
            var $signinClear = $(' #signin_user_clear ');

            $signinSubmit.on('click', function (e) {
                e.preventDefault();

                var data = {
                    email: $signinEmail.val(),
                    password: $signinPassword.val()
                };

                _this5.api.signinUser(data).then(function (user) {
                    window.location.href = '/';
                }, function (err) {
                    return console.error(err);
                });
            });

            $signinClear.on('click', function (e) {
                e.preventDefault();

                $signinEmail.val('');
                $signinPassword.val('');
            });
        }

        /**
         *
         */

    }, {
        key: 'signupUser',
        value: function signupUser() {
            var _this6 = this;

            var $signupUserName = $(' #signup_user_name ');
            var $signupUserEmail = $(' #signup_user_email ');
            var $signupUserPassword = $(' #signup_user_password ');
            var $signupUserPasswordVerify = $(' #signup_user_password_verify ');
            var $signupUserSubmit = $(' #signup_user_submit ');
            var $signupUserClear = $(' #signup_user_clear ');

            $signupUserSubmit.on('click', function (e) {
                e.preventDefault();

                if ($signupUserPassword.val() !== $signupUserPasswordVerify.val()) throw new Error('Both password must match.');

                var data = {
                    name: $signupUserName.val(),
                    email: $signupUserEmail.val(),
                    password: $signupUserPassword.val()
                };

                _this6.api.createUser(data).then(function (user) {
                    window.location.href = '/';
                }, function (err) {
                    return console.error(err);
                });
            });

            $signupUserClear.on('click', function (e) {
                e.preventDefault();

                $signupUserEmail.val('');
                $signupUserPassword.val('');
                $signupUserPasswordVerify.val('');
            });
        }
    }]);

    return _class;
}();

},{"./user.api":6,"./user.html":7}]},{},[5]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJidW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24gY3JlYXRlRXZlbnQoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLmRhdGUgfHwgIWRhdGEubG9jYXRpb24gfHwgIWRhdGEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVFdmVudCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgZGF0ZSwgYSBsb2NhdGlvbiwgYW5kIGEgZGVzY3JpcHRpb24uJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0RXZlbnQ6IGZ1bmN0aW9uIGdldEV2ZW50KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMvJyArIGlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldEV2ZW50czogZnVuY3Rpb24gZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXZlbnRzLycsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlRXZlbnQ6IGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5pZCB8fCAhZGF0YS5kYXRlIHx8ICFkYXRhLmxvY2F0aW9uIHx8ICFkYXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXBkYXRlRXZlbnQgbXVzdCBiZSBjYWxsZWQgd2l0aCBhbiBpZCwgYSBkYXRlLCBhIGxvY2F0aW9uLCBhbmQgYSBkZXNjcmlwdGlvbi4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2V2ZW50cy8nICsgb3B0aW9ucy5pZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgRXZlbnRNb2R1bGVcbiAqIEZ1bmN0aW9uYWxpdHkgdGFraW5nIEFQSSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGV2ZW50cyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ldmVudC5hcGknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoX2NsYXNzLCBbe1xuICAgICAgICBrZXk6ICdtYWtlTGlzdEV2ZW50c1BhbmVsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VMaXN0RXZlbnRzUGFuZWwoJGNvbnRhaW5lciwgJGRldGFpbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RXZlbnRzKCkudGhlbihmdW5jdGlvbiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGV2ZW50c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBldmVudC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IGV2ZW50LmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBldmVudC5kYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gZXZlbnQubG9jYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudEh0bWwgPSAnXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtMyBldmVudF9wYW5lbCB0ZXh0LWNlbnRlclwiIGRhdGEtaWQ9XCInICsgaWQgKyAnXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1pbmZvXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4nICsgZGF0ZSArICc8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPicgKyBkZXNjcmlwdGlvbiArICc8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Pcmdhbml6ZWQgYnkgKG5hbWUpPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb290ZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGV2ZW50SHRtbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciAkZXZlbnRQYW5lbCA9ICQoJyAuZXZlbnRfcGFuZWwgJyk7XG5cbiAgICAgICAgICAgICAgICAkZXZlbnRQYW5lbC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYWtlRXZlbnRDYXJkKCQoX3RoaXMyKS5hdHRyKCdkYXRhLWlkJyksICRkZXRhaWxDb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtYWtlRXZlbnRDYXJkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VFdmVudENhcmQoaWQsICRkZXRhaWxDb250YWluZXIpIHtcbiAgICAgICAgICAgICRkZXRhaWxDb250YWluZXIuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldEV2ZW50KGlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gZGF0YS5ldmVudDtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBldmVudC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IGV2ZW50LmRhdGU7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gZXZlbnQubG9jYXRpb247XG5cbiAgICAgICAgICAgICAgICB2YXIgJGV2ZW50RGV0YWlsT3B0aW9ucyA9ICQoJyAuZXZlbnRfZGV0YWlsX29wdGlvbnMgJyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRDYXJkSHRtbCA9ICdcXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicm93IHRleHQtY2VudGVyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtbWQtNFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+SW5mb3JtYXRpb248L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4nICsgZGVzY3JpcHRpb24gKyAnPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Pcmdhbml6ZWQgYnkgKG5hbWUpPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLW1kLTRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlBhcnRpY2lwYW50czwvaDI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtbWQtNFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+TG9jYXRpb248L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4nICsgbG9jYXRpb24gKyAnPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAnO1xuXG4gICAgICAgICAgICAgICAgJGRldGFpbENvbnRhaW5lci5hcHBlbmQoZXZlbnRDYXJkSHRtbCk7XG5cbiAgICAgICAgICAgICAgICAkZXZlbnREZXRhaWxPcHRpb25zLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtYWtlQ3JlYXRlRXZlbnRQYW5lbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlQ3JlYXRlRXZlbnRQYW5lbCgkY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyICRjcmVhdGVFdmVudERlc2NyaXB0aW9uID0gJCgnICNjcmVhdGVfZXZlbnRfZGVzY3JpcHRpb24gJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZUV2ZW50TG9jYXRpb24gPSAkKCcgI2NyZWF0ZV9ldmVudF9sb2NhdGlvbiAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlRXZlbnREYXRlID0gJCgnICNjcmVhdGVfZXZlbnRfZGF0ZSAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlRXZlbnRTdWJtaXQgPSAkKCcgI2NyZWF0ZV9ldmVudF9zdWJtaXQgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZUV2ZW50Q2xlYXIgPSAkKCcgI2NyZWF0ZV9ldmVudF9jbGVhciAnKTtcblxuICAgICAgICAgICAgJGNyZWF0ZUV2ZW50U3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICRjcmVhdGVFdmVudERlc2NyaXB0aW9uLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJGNyZWF0ZUV2ZW50TG9jYXRpb24udmFsKCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6ICRjcmVhdGVFdmVudERhdGUudmFsKClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgX3RoaXMzLmFwaS5jcmVhdGVFdmVudChkYXRhKS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vZXZlbnQuYXBpXCI6MX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVIb2JieTogZnVuY3Rpb24gY3JlYXRlSG9iYnkoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLm5hbWUgfHwgIWRhdGEuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVIb2JieSBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgbmFtZSBhbmQgYSBjYXRlZ29yeS4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvYmJpZXMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SG9iYnk6IGZ1bmN0aW9uIGdldEhvYmJ5KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBpZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRIb2JiaWVzOiBmdW5jdGlvbiBnZXRIb2JiaWVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG9iYmllcy8nLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUhvYmJ5OiBmdW5jdGlvbiB1cGRhdGVIb2JieShkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIWRhdGEuaWQgfHwgIWRhdGEubmFtZSB8fCAhZGF0YS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZUhvYmJ5IG11c3QgYmUgY2FsbGVkIHdpdGggYW4gaWQsIGEgbmFtZSwgYW5kIGEgY2F0ZWdvcnkuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBvcHRpb25zLmlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyBIb2JieU1vZHVsZVxuICogRnVuY3Rpb25hbGl0eSB0YWtpbmcgQVBJIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gaG9iYmllcyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ob2JieS5hcGknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vaG9iYnkuYXBpXCI6M31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEJST1dTRVJJRlkgRU5UUlkgUE9JTlRcbiAqIFRoaXMgc2NyaXB0IGluc3RhbnRpYXRlcyBhbGwgcmVxdWlyZWQgbW9kdWxlcyBmb3IgU29ja2V0U29jaWFsIGFuZCBydW5zIGEgbGlzdCBvZiBjb21tYW5kcy5cbiAqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFVzZXJNb2R1bGUgPSByZXF1aXJlKCcuL3VzZXIvdXNlci5tb2R1bGUnKTtcbiAgICB2YXIgRXZlbnRNb2R1bGUgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50Lm1vZHVsZScpO1xuICAgIHZhciBIb2JieU1vZHVsZSA9IHJlcXVpcmUoJy4vaG9iYnkvaG9iYnkubW9kdWxlJyk7XG5cbiAgICB2YXIgVVNFUl9NT0RVTEUgPSBuZXcgVXNlck1vZHVsZSgpO1xuICAgIHZhciBFVkVOVF9NT0RVTEUgPSBuZXcgRXZlbnRNb2R1bGUoKTtcbiAgICB2YXIgSE9CQllfTU9EVUxFID0gbmV3IEhvYmJ5TW9kdWxlKCk7XG5cbiAgICB2YXIgJGNyZWF0ZVVzZXJQYW5lbCA9ICQoJyAjY3JlYXRlX3VzZXJfcGFuZWwgJyk7XG4gICAgdmFyICR1c2VyTGlzdFBhbmVsID0gJCgnICNhZG1pbl91c2VyX2xpc3QgJyk7XG4gICAgdmFyICRtZW1iZXJMaXN0ID0gJCgnICNtZW1iZXJfbGlzdCAnKTtcbiAgICB2YXIgJG1lbWJlckRldGFpbCA9ICQoJyAjbWVtYmVyX2RldGFpbCAnKTtcbiAgICB2YXIgJGV2ZW50TGlzdFBhbmVsID0gJCgnICNldmVudF9saXN0X3BhbmVsICcpO1xuICAgIHZhciAkY3JlYXRlRXZlbnRQYW5lbCA9ICQoJyAjY3JlYXRlX2V2ZW50X3BhbmVsICcpO1xuICAgIHZhciAkZXZlbnREZXRhaWwgPSAkKCcgI2V2ZW50X2RldGFpbCAnKTtcblxuICAgIC8vIEFkbWluXG4gICAgVVNFUl9NT0RVTEUubWFrZUNyZWF0ZVVzZXJQYW5lbCgkY3JlYXRlVXNlclBhbmVsKTtcbiAgICBVU0VSX01PRFVMRS5tYWtlVXNlckxpc3RQYW5lbCgkdXNlckxpc3RQYW5lbCk7XG5cbiAgICAvLyBFdmVudHNcbiAgICBFVkVOVF9NT0RVTEUubWFrZUNyZWF0ZUV2ZW50UGFuZWwoJGNyZWF0ZUV2ZW50UGFuZWwpO1xuICAgIEVWRU5UX01PRFVMRS5tYWtlTGlzdEV2ZW50c1BhbmVsKCRldmVudExpc3RQYW5lbCwgJGV2ZW50RGV0YWlsKTtcblxuICAgIC8vIE1lbWJlcnNcbiAgICBVU0VSX01PRFVMRS5tYWtlTWVtYmVySG9iYnlMaXN0KCRtZW1iZXJMaXN0LCAkbWVtYmVyRGV0YWlsKTtcbiAgICBVU0VSX01PRFVMRS5zaWduaW5Vc2VyKCk7XG4gICAgVVNFUl9NT0RVTEUuc2lnbnVwVXNlcigpO1xuXG4gICAgLy8gTG9nb1xuICAgIHZhciAkbG9nbyA9ICQoJyAubG9nbyAnKTtcblxuICAgICRsb2dvLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICB9KTtcblxuICAgIC8vIFJhbmRvbSBtZW1iZXIgZmFiXG4gICAgdmFyICRyYW5kb21NZW1iZXJGYWIgPSAkKCcgI3JhbmRvbV9tZW1iZXJfZmFiICcpO1xuXG4gICAgJHJhbmRvbU1lbWJlckZhYi50b29sdGlwKCk7XG5cbiAgICBpZiAoJHJhbmRvbU1lbWJlckZhYi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRvYXN0ci5vcHRpb25zLnBvc2l0aW9uQ2xhc3MgPSBcInRvYXN0LWJvdHRvbS1yaWdodFwiO1xuICAgICAgICB0b2FzdHIuaW5mbygnQXMgd2l0aCBtb3N0IG1vZGVybiB3ZWIgc2l0ZXMsIFNvY2tldFNvY2lhbCB1c2VzIGNvb2tpZXMgdG8gdHJhY2sgc2Vzc2lvbiBpbmZvcm1hdGlvbi4nKTtcbiAgICB9XG5cbiAgICAvLyBTaWduIG91dFxuICAgIHZhciAkc2lnbm91dFVzZXIgPSAkKCcgI3NpZ25vdXRfdXNlciAnKTtcblxuICAgICRzaWdub3V0VXNlci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9zaWdub3V0JyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3ModXNlcikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFRvb2x0aXBzXG4gICAgdmFyICRuYXZiYXJMaW5rcyA9ICQoJyAubmF2YmFyX2xpbmsgJyk7XG5cbiAgICAkbmF2YmFyTGlua3MudG9vbHRpcCh7XG4gICAgICAgIG15OiBcImxlZnQtMjUgYm90dG9tXCIsXG4gICAgICAgIGF0OiBcImNlbnRlclwiXG4gICAgfSk7XG5cbiAgICAvL1xuICAgIHZhciAkZWpzSXNTaWduZWRJbiA9ICQoJyAjZWpzX2lzU2lnbmVkSW4gJyk7XG4gICAgdmFyICRldmVudERldGFpbFdyYXBwZXIgPSAkKCcgLmV2ZW50X2RldGFpbF93cmFwcGVyICcpO1xuXG4gICAgaWYgKCRlanNJc1NpZ25lZEluLnZhbCgpKSAkZXZlbnREZXRhaWxXcmFwcGVyLnNob3coKTtcbn0pO1xuXG59LHtcIi4vZXZlbnQvZXZlbnQubW9kdWxlXCI6MixcIi4vaG9iYnkvaG9iYnkubW9kdWxlXCI6NCxcIi4vdXNlci91c2VyLm1vZHVsZVwiOjh9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlVXNlcjogZnVuY3Rpb24gY3JlYXRlVXNlcihkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2lnbmluVXNlcjogZnVuY3Rpb24gc2lnbmluVXNlcihkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbmluJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0VXNlcnM6IGZ1bmN0aW9uIGdldFVzZXJzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvdXNlcnMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2Vycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1c2Vycyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mb3JtYXRpb246IGZ1bmN0aW9uIGdldFVzZXJJbmZvcm1hdGlvbihpZCwgZmllbGRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvdXNlcnMvJyArIGlkICsgJy9pbmZvJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBmaWVsZHNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoaW5mbykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbmZvKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVVc2VyUGFuZWxIdG1sOiBmdW5jdGlvbiBjcmVhdGVVc2VyUGFuZWxIdG1sKCkge1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgICA8c2VjdGlvbiBpZD1cXFwiY3JlYXRlX3VzZXJfZmxhc2hlclxcXCIgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgcGFuZWwtYWxlcnRcXFwiPjwvc2VjdGlvbj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXVzZXJcXFwiPjwvaT48aSBjbGFzcz1cXFwiZmEgZmEtcGx1c1xcXCI+PC9pPiAmbmJzcDtDcmVhdGUgVXNlclxcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cXG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XFxcImNyZWF0ZV91c2VyX2Zvcm1cXFwiIGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPk5hbWU8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJjcmVhdGVfdXNlcl9uYW1lXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5FbWFpbDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX2VtYWlsXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX3Bhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UaXRsZTwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX3RpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFib3V0IG1lPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwiY3JlYXRlX3VzZXJfYWJvdXRfbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cXFwicGFuZWwtZm9vdGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcImNyZWF0ZV91c2VyX2NsZWFyXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2hcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICBDbGVhclxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJjcmVhdGVfdXNlcl9zdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hcnJvdy1yaWdodFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1Ym1pdFxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCI7XG4gICAgfSxcbiAgICBjcmVhdGVVc2VyTGlzdFBhbmVsSHRtbDogZnVuY3Rpb24gY3JlYXRlVXNlckxpc3RQYW5lbEh0bWwoKSB7XG4gICAgICAgIHJldHVybiBcIlxcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDM+PGkgY2xhc3M9XFxcImZhIGZhLXVzZXJzXFxcIj48L2k+IFVzZXIgTGlzdDwvaDM+XFxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5IHVzZXJfbGlzdF9wYW5lbFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XFxcInRhYmxlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlVzZXI8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPklEPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cXFwidXNlcl9saXN0X3Jvd3NcXFwiPjwvdGJvZHk+XFxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cXFwicGFuZWwtZm9vdGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJ1c2VyX2xpc3RfZmlsdGVyIGZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkZpbHRlclxcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgIFwiO1xuICAgIH0sXG4gICAgY3JlYXRlTWVtYmVyUHJvZmlsZUNhcmRIdG1sOiBmdW5jdGlvbiBjcmVhdGVNZW1iZXJQcm9maWxlQ2FyZEh0bWwob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtZW1iZXJfcHJvZmlsZV9jYXJkXFxcIj5cXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJjb2wteHMtMTIgY29sLW1kLTRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiaHR0cDovL3BsYWNlaG9sZC5pdC8yMjB4MjIwXFxcIiBjbGFzcz1cXFwiaW1nLXJlc3BvbnNpdmUgY2VudGVyLWJsb2NrXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcInhzLW1pZGRsZSBjb2wteHMtMTIgY29sLW1kLThcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDM+XCIgKyBvcHRpb25zLm5hbWUgKyBcIjwvaDM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5cIiArIG9wdGlvbnMuZW1haWwgKyBcIjwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS0yeCBmYS1mYWNlYm9va1xcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtMnggZmEtdHdpdHRlclxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcImNvbC1tZC0xMiBtZW1iZXJfaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UaXRsZTwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlwiICsgb3B0aW9ucy50aXRsZSArIFwiPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFib3V0IG1lPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XCIgKyBvcHRpb25zLmFib3V0TWUgKyBcIjwvcD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Ib2JiaWVzPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+SG9iYmllczwvcD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCI7XG4gICAgfVxufTtcblxufSx7fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzIFVzZXJNb2R1bGVcbiAqIEZ1bmN0aW9uYWxpdHkgdGFraW5nIEFQSSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHVzZXJzIGZyb20gdGhlIGJhY2tlbmQgYW5kIGNyZWF0aW5nIGNvbXBvbmVudHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIF9jbGFzcygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIF9jbGFzcyk7XG5cbiAgICAgICAgdGhpcy5hcGkgPSByZXF1aXJlKCcuL3VzZXIuYXBpJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoIGEgcGFuZWwgd2l0aCBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSBhIG5ldyB1c2VyLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkY29udGFpbmVyIC0gQSBqUXVlcnkgc2VsZWN0b3IuXG4gICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhfY2xhc3MsIFt7XG4gICAgICAgIGtleTogJ21ha2VDcmVhdGVVc2VyUGFuZWwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbWFrZUNyZWF0ZVVzZXJQYW5lbCgkY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCEkY29udGFpbmVyKSB0aHJvdyBuZXcgRXJyb3IoJ21ha2VDcmVhdGVVc2VQYW5lbCBtdXN0IGJlIGdpdmVuIGEgY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIHZhciBjcmVhdGVVc2VyUGFuZWxIdG1sID0gcmVxdWlyZSgnLi91c2VyLmh0bWwnKS5jcmVhdGVVc2VyUGFuZWxIdG1sO1xuICAgICAgICAgICAgLy8gVE9ETzogVGVzdCBvdXRwdXQgdG8gY2hlY2sgZm9yIGZsYXNoZXJcbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGNyZWF0ZVVzZXJQYW5lbEh0bWwpO1xuICAgICAgICAgICAgLy8gVE9ETzogdGVzdCBjb250YWluZXIgaGFzIHBhbmVsXG5cbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlckNsZWFyID0gJCgnICNjcmVhdGVfdXNlcl9jbGVhciAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlclN1Ym1pdCA9ICQoJyAjY3JlYXRlX3VzZXJfc3VibWl0ICcpO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBUZXN0IGJ1dHRvbnMgZXhpc3RcblxuICAgICAgICAgICAgJGNyZWF0ZVVzZXJDbGVhci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuY2xlYXJDcmVhdGVVc2VyKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkY3JlYXRlVXNlclN1Ym1pdC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuY3JlYXRlVXNlcihlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiB0ZXN0IGNyZWF0ZSB1c2VyIGNsZWFyIGJ1dHRvbSBjbGVhcnMgdGhlIHVzZXJcbiAgICAgICAgICAgIC8vIFRPRE86IHRlc3QgY3JlYXRlIHVzZXIgc3VibWl0IGJ1dHRvbiBhZGRzIHRoZSB1c2VyIHRvIHRoZSBkYlxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSAnZW1haWwnIGFuZCAncGFzc3dvcmQnIGZpZWxkcyBpbiB0aGUgJ0NyZWF0ZSBVc2VyJyBmb3JtLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZSAtIEFueSBwYXNzZWQgZXZlbnRzIGZyb20gYW4gZXZlbnQgaGFuZGxpbmcgbWV0aG9kLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2xlYXJDcmVhdGVVc2VyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyQ3JlYXRlVXNlcihlKSB7XG4gICAgICAgICAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJOYW1lID0gJCgnICNjcmVhdGVfdXNlcl9uYW1lICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyRW1haWwgPSAkKCcgI2NyZWF0ZV91c2VyX2VtYWlsICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyUGFzc3dvcmQgPSAkKCcgI2NyZWF0ZV91c2VyX3Bhc3N3b3JkICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyVGl0bGUgPSAkKCcgI2NyZWF0ZV91c2VyX3RpdGxlICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyQWJvdXRNZSA9ICQoJyAjY3JlYXRlX3VzZXJfYWJvdXRfbWUgJyk7XG5cbiAgICAgICAgICAgICRjcmVhdGVVc2VyTmFtZS52YWwoJycpO1xuICAgICAgICAgICAgJGNyZWF0ZVVzZXJFbWFpbC52YWwoJycpO1xuICAgICAgICAgICAgJGNyZWF0ZVVzZXJQYXNzd29yZC52YWwoJycpO1xuICAgICAgICAgICAgJGNyZWF0ZVVzZXJUaXRsZS52YWwoJycpO1xuICAgICAgICAgICAgJGNyZWF0ZVVzZXJBYm91dE1lLnZhbCgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXNpbmcgdGhlIGZvcm0gZGF0YSwgY3JlYXRlIGEgbmV3IHVzZXIgaW4gdGhlIGRhdGFiYXNlLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZSAtIEFueSBwYXNzZWQgZXZlbnRzIGZyb20gYW4gZXZlbnQgaGFuZGxpbmcgbWV0aG9kLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY3JlYXRlVXNlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVVc2VyKGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJGbGFzaGVyID0gJCgnICNjcmVhdGVfdXNlcl9mbGFzaGVyICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyTmFtZSA9ICQoJyAjY3JlYXRlX3VzZXJfbmFtZSAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlckVtYWlsID0gJCgnICNjcmVhdGVfdXNlcl9lbWFpbCAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlclBhc3N3b3JkID0gJCgnICNjcmVhdGVfdXNlcl9wYXNzd29yZCAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlclRpdGxlID0gJCgnICNjcmVhdGVfdXNlcl90aXRsZSAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlckFib3V0TWUgPSAkKCcgI2NyZWF0ZV91c2VyX2Fib3V0X21lICcpO1xuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAkY3JlYXRlVXNlck5hbWUudmFsKCksXG4gICAgICAgICAgICAgICAgZW1haWw6ICRjcmVhdGVVc2VyRW1haWwudmFsKCksXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRjcmVhdGVVc2VyUGFzc3dvcmQudmFsKCksXG4gICAgICAgICAgICAgICAgdGl0bGU6ICRjcmVhdGVVc2VyVGl0bGUudmFsKCkgfHwgJycsXG4gICAgICAgICAgICAgICAgYWJvdXRNZTogJGNyZWF0ZVVzZXJBYm91dE1lLnZhbCgpIHx8ICcnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoIWRhdGEuZW1haWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IoJ0FuIGVtYWlsIGlzIHJlcXVpcmVkIHRvIGpvaW4gU29ja2V0U29jaWFsLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGlzRGVhbGVyU29ja2V0RW1haWwgPSAvXlstYS16MC05fiEkJV4mKl89K317XFwnP10rKFxcLlstYS16MC05fiEkJV4mKl89K317XFwnP10rKSpAZGVhbGVyc29ja2V0LmNvbSQvLnRlc3QoZGF0YS5lbWFpbCk7XG5cbiAgICAgICAgICAgIGlmICghaXNEZWFsZXJTb2NrZXRFbWFpbCkge1xuICAgICAgICAgICAgICAgIGZsYXNoQ3JlYXRlVXNlckVycm9yKCdBIERlYWxlclNvY2tldCBlbWFpbCBpcyByZXF1aXJlZCB0byBqb2luIFNvY2tldFNvY2lhbC4gKEBkZWFsZXJzb2NrZXQuY29tKScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEucGFzc3dvcmQubGVuZ3RoIDwgNikge1xuICAgICAgICAgICAgICAgIGZsYXNoQ3JlYXRlVXNlckVycm9yKCdZb3VyIHBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3Qgc2l4IGNoYXJhY3RlcnMuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFwaS5jcmVhdGVVc2VyKGRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHVzZXJMaXN0UGFuZWxQYW5lbHMgPSAkKCcgLnVzZXJfbGlzdF9yb3dzICcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZsYXNoQ3JlYXRlVXNlclN1Y2Nlc3MocmVzdWx0LnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckNyZWF0ZVVzZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICBfdGhpczMudXBkYXRlVXNlckxpc3RQYW5lbCgkdXNlckxpc3RQYW5lbFBhbmVscyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgZGF0YSByZWNlaXZlZCBpbiBjcmVhdGVVc2VyIG1ldGhvZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2hvdyBhIGdyZWVuIGFsZXJ0IG5vdGlmeWluZyB0aGUgdXNlciB0aGF0IGEgbmV3IHVzZXIgd2FzIGNyZWF0ZWQuXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIGZvciB0aGUgZmxhc2hlci5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gZmxhc2hDcmVhdGVVc2VyU3VjY2VzcyhtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLnJlbW92ZUNsYXNzKCk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmFkZENsYXNzKCdhbGVydCcpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5hZGRDbGFzcygnYWxlcnQtc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci50ZXh0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5mYWRlSW4oKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTaG93IGEgcmVkIGFsZXJ0IG5vdGlmeWluZyB0aGUgdXNlciB0aGF0IGEgbmV3IHVzZXIgd2FzIG5vdCBjcmVhdGVkLlxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSBmb3IgdGhlIGZsYXNoZXIuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZsYXNoQ3JlYXRlVXNlckVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIucmVtb3ZlQ2xhc3MoKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuYWRkQ2xhc3MoJ2FsZXJ0Jyk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmFkZENsYXNzKCdhbGVydC1kYW5nZXInKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIudGV4dChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ2xlYXIgdGhlICdlbWFpbCcgYW5kICdwYXNzd29yZCcgZmllbGRzIGluIHRoZSAnQ3JlYXRlIFVzZXInIGZvcm0uXG4gICAgICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZSAtIEFueSBwYXNzZWQgZXZlbnRzIGZyb20gYW4gZXZlbnQgaGFuZGxpbmcgbWV0aG9kLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhckNyZWF0ZVVzZXIoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJFbWFpbC52YWwoJycpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyUGFzc3dvcmQudmFsKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBdHRhY2ggYSBwYW5lbCB3aXRoIGZ1bmN0aW9uYWxpdHkgdG8gZGlzcGxheSBhIGxpc3Qgb2YgdXNlcnMuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkY29udGFpbmVyIC0gQSBqUXVlcnkgc2VsZWN0b3IuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtYWtlVXNlckxpc3RQYW5lbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlVXNlckxpc3RQYW5lbCgkY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgdXNlckxpc3RQYW5lbEh0bWwgPSByZXF1aXJlKCcuL3VzZXIuaHRtbCcpLmNyZWF0ZVVzZXJMaXN0UGFuZWxIdG1sO1xuXG4gICAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh1c2VyTGlzdFBhbmVsSHRtbCk7XG5cbiAgICAgICAgICAgIHZhciAkdXNlckxpc3RQYW5lbCA9ICQoJyAudXNlcl9saXN0X3Jvd3MgJyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVXNlckxpc3RQYW5lbCgkdXNlckxpc3RQYW5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2xlYXIgYSB1c2VyIGxpc3QsIGdldCBhbGwgdXNlcnMgZnJvbSB0aGUgc2VydmVyLCB0aGVuIGl0ZXJhdGUgb3ZlciB0aGVtIGFuZCBtYWtlIHRhYmxlIHJvd3MuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICd1cGRhdGVVc2VyTGlzdFBhbmVsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVVzZXJMaXN0UGFuZWwoJHVzZXJMaXN0UGFuZWwpIHtcbiAgICAgICAgICAgICR1c2VyTGlzdFBhbmVsLmh0bWwoJycpO1xuXG4gICAgICAgICAgICB0aGlzLmFwaS5nZXRVc2VycygpLnRoZW4oZnVuY3Rpb24gKHVzZXJzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHVzZXJzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSB1c2Vyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9ICdcXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1kZWZhdWx0XCI+Li4uPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4nICsgdXNlci5lbWFpbCArICc8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JyArIHVzZXIuaWQgKyAnPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgICAgICAgICAgJztcblxuICAgICAgICAgICAgICAgICAgICAkdXNlckxpc3RQYW5lbC5hcHBlbmQocm93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkY29udGFpbmVyIC0gQSBqUXVlcnkgc2VsZWN0b3IgKHRib2R5KS5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9ICRkZXRhaWxDb250YWluZXIgLSBBbm90aGVyIHNlbGVjdG9yIGZvciBkZXRhaWwgdmlldy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ21ha2VNZW1iZXJIb2JieUxpc3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbWFrZU1lbWJlckhvYmJ5TGlzdCgkY29udGFpbmVyLCAkZGV0YWlsQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLmFwaS5nZXRVc2VycygpLnRoZW4oZnVuY3Rpb24gKHVzZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHVzZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVtYWlsID0gdXNlci5lbWFpbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9ICdcXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJtZW1iZXJfcm93XCIgZGF0YS1pZD1cIicgKyBpZCArICdcIiBkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIiBkYXRhLWVtYWlsPVwiJyArIGVtYWlsICsgJ1wiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JyArIG5hbWUgKyAnPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPicgKyBlbWFpbCArICc8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgICAgICAgICAnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZChyb3cpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgJG1lbWJlclJvdyA9ICQoJyAubWVtYmVyX3JvdyAnKTtcblxuICAgICAgICAgICAgICAgICRtZW1iZXJSb3cuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWFrZU1lbWJlclByb2ZpbGVDYXJkKCQoX3RoaXM0KSwgJGRldGFpbENvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKHsgZXJyOiBlcnIgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gJG1lbWJlclJvdyAtIEEgcm93IHdpdGggZGF0YSBhdHRyaWJ1dGVzLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gJGRldGFpbENvbnRhaW5lciAtIEEgalF1ZXJ5IHNlbGVjdG9yLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbWFrZU1lbWJlclByb2ZpbGVDYXJkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VNZW1iZXJQcm9maWxlQ2FyZCgkbWVtYmVyUm93LCAkZGV0YWlsQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAkbWVtYmVyUm93LmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJG1lbWJlclJvdy5hdHRyKCdkYXRhLW5hbWUnKTtcbiAgICAgICAgICAgIHZhciBlbWFpbCA9ICRtZW1iZXJSb3cuYXR0cignZGF0YS1lbWFpbCcpO1xuXG4gICAgICAgICAgICB2YXIgaW5mb1RvR2V0ID0gWyd0aXRsZScsICdhYm91dE1lJ107XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFVzZXJJbmZvcm1hdGlvbihpZCwgaW5mb1RvR2V0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGl0bGUgPSByZXN1bHQuaW5mby50aXRsZTtcbiAgICAgICAgICAgICAgICB2YXIgYWJvdXRNZSA9IHJlc3VsdC5pbmZvLmFib3V0TWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHsgbmFtZTogbmFtZSwgZW1haWw6IGVtYWlsLCB0aXRsZTogdGl0bGUsIGFib3V0TWU6IGFib3V0TWUgfTtcblxuICAgICAgICAgICAgICAgIHZhciBtZW1iZXJQcm9maWxlQ2FyZEh0bWwgPSByZXF1aXJlKCcuL3VzZXIuaHRtbCcpLmNyZWF0ZU1lbWJlclByb2ZpbGVDYXJkSHRtbChvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgICRkZXRhaWxDb250YWluZXIuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgICAgICAkZGV0YWlsQ29udGFpbmVyLmFwcGVuZChtZW1iZXJQcm9maWxlQ2FyZEh0bWwpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2lnbmluVXNlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzaWduaW5Vc2VyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciAkc2lnbmluRW1haWwgPSAkKCcgI3NpZ25pbl91c2VyX2VtYWlsICcpO1xuICAgICAgICAgICAgdmFyICRzaWduaW5QYXNzd29yZCA9ICQoJyAjc2lnbmluX3VzZXJfcGFzc3dvcmQgJyk7XG4gICAgICAgICAgICB2YXIgJHNpZ25pblN1Ym1pdCA9ICQoJyAjc2lnbmluX3VzZXJfc3VibWl0ICcpO1xuICAgICAgICAgICAgdmFyICRzaWduaW5DbGVhciA9ICQoJyAjc2lnbmluX3VzZXJfY2xlYXIgJyk7XG5cbiAgICAgICAgICAgICRzaWduaW5TdWJtaXQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICRzaWduaW5FbWFpbC52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzaWduaW5QYXNzd29yZC52YWwoKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBfdGhpczUuYXBpLnNpZ25pblVzZXIoZGF0YSkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNpZ25pbkNsZWFyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgJHNpZ25pbkVtYWlsLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgJHNpZ25pblBhc3N3b3JkLnZhbCgnJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2lnbnVwVXNlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzaWdudXBVc2VyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciAkc2lnbnVwVXNlck5hbWUgPSAkKCcgI3NpZ251cF91c2VyX25hbWUgJyk7XG4gICAgICAgICAgICB2YXIgJHNpZ251cFVzZXJFbWFpbCA9ICQoJyAjc2lnbnVwX3VzZXJfZW1haWwgJyk7XG4gICAgICAgICAgICB2YXIgJHNpZ251cFVzZXJQYXNzd29yZCA9ICQoJyAjc2lnbnVwX3VzZXJfcGFzc3dvcmQgJyk7XG4gICAgICAgICAgICB2YXIgJHNpZ251cFVzZXJQYXNzd29yZFZlcmlmeSA9ICQoJyAjc2lnbnVwX3VzZXJfcGFzc3dvcmRfdmVyaWZ5ICcpO1xuICAgICAgICAgICAgdmFyICRzaWdudXBVc2VyU3VibWl0ID0gJCgnICNzaWdudXBfdXNlcl9zdWJtaXQgJyk7XG4gICAgICAgICAgICB2YXIgJHNpZ251cFVzZXJDbGVhciA9ICQoJyAjc2lnbnVwX3VzZXJfY2xlYXIgJyk7XG5cbiAgICAgICAgICAgICRzaWdudXBVc2VyU3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRzaWdudXBVc2VyUGFzc3dvcmQudmFsKCkgIT09ICRzaWdudXBVc2VyUGFzc3dvcmRWZXJpZnkudmFsKCkpIHRocm93IG5ldyBFcnJvcignQm90aCBwYXNzd29yZCBtdXN0IG1hdGNoLicpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICRzaWdudXBVc2VyTmFtZS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICRzaWdudXBVc2VyRW1haWwudmFsKCksXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2lnbnVwVXNlclBhc3N3b3JkLnZhbCgpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIF90aGlzNi5hcGkuY3JlYXRlVXNlcihkYXRhKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc2lnbnVwVXNlckNsZWFyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgJHNpZ251cFVzZXJFbWFpbC52YWwoJycpO1xuICAgICAgICAgICAgICAgICRzaWdudXBVc2VyUGFzc3dvcmQudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAkc2lnbnVwVXNlclBhc3N3b3JkVmVyaWZ5LnZhbCgnJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBfY2xhc3M7XG59KCk7XG5cbn0se1wiLi91c2VyLmFwaVwiOjYsXCIuL3VzZXIuaHRtbFwiOjd9XX0se30sWzVdKTtcbiJdLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
