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

                        var eventHtml = '\n                        <section class="col-md-3 event_panel" data-id="' + id + '">\n                            <div class="panel panel-info">\n                                <header class="panel-heading">\n                                    <h3>' + date + '</h3>\n                                </header>\n                                <div class="panel-body">\n                                    <p>' + description + '</p>\n                                </div>\n                                <footer class="panel-footer">\n                                    <p>Organized by (name)</p>\n                                </footer>\n                            </div>\n                        </section>\n                    ';

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
    // USER_MODULE.makeCreateUserPanel($createUserPanel);
    USER_MODULE.makeUserListPanel($userListPanel);

    // Events
    EVENT_MODULE.makeCreateEventPanel($createEventPanel);
    EVENT_MODULE.makeListEventsPanel($eventListPanel, $eventDetail);

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
        return "\n            <div class=\"member_profile_card\">\n                <section class=\"row\">\n                    <div class=\"row\">\n                        <section class=\"col-xs-12 col-md-4\">\n                            <img src=\"http://placehold.it/220x220\" class=\"img-responsive center-block\">\n                        </section>\n                        <sectiom class=\"col-xs-12 col-md-8\">\n                            <h3>" + options.name + "</h3>\n                            <h4>" + options.email + "</h4>\n                            <br />\n                            <span>\n                                <i class=\"fa fa-2x fa-facebook\"></i>\n                                &nbsp;\n                                <i class=\"fa fa-2x fa-twitter\"></i>\n                            </span>\n                        </sectiom>\n                    </div>\n                    <div class=\"row\">\n                        <section class=\"col-md-12\">\n                            <hr />\n                        </section>\n                    </div>\n                    <div class=\"row\">\n                        <section class=\"col-md-12 member_info\">\n                            <label>Title</label>\n                            <p>" + options.title + "</p>\n                            <br />\n                            <label>About me</label>\n                            <p>" + options.aboutMe + "</p>\n                            <br />\n                            <label>Hobbies</label>\n                            <p>Hobbies</p>\n                        </section>\n                    </div>\n                </section>\n            </div>\n        ";
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
    }]);

    return _class;
}();

},{"./user.api":6,"./user.html":7}]},{},[5]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJidW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24gY3JlYXRlRXZlbnQoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLmRhdGUgfHwgIWRhdGEubG9jYXRpb24gfHwgIWRhdGEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVFdmVudCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgZGF0ZSwgYSBsb2NhdGlvbiwgYW5kIGEgZGVzY3JpcHRpb24uJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0RXZlbnQ6IGZ1bmN0aW9uIGdldEV2ZW50KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ldmVudHMvJyArIGlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldEV2ZW50czogZnVuY3Rpb24gZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXZlbnRzLycsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlRXZlbnQ6IGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5pZCB8fCAhZGF0YS5kYXRlIHx8ICFkYXRhLmxvY2F0aW9uIHx8ICFkYXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXBkYXRlRXZlbnQgbXVzdCBiZSBjYWxsZWQgd2l0aCBhbiBpZCwgYSBkYXRlLCBhIGxvY2F0aW9uLCBhbmQgYSBkZXNjcmlwdGlvbi4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2V2ZW50cy8nICsgb3B0aW9ucy5pZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgRXZlbnRNb2R1bGVcbiAqIEZ1bmN0aW9uYWxpdHkgdGFraW5nIEFQSSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIGV2ZW50cyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ldmVudC5hcGknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoX2NsYXNzLCBbe1xuICAgICAgICBrZXk6ICdtYWtlTGlzdEV2ZW50c1BhbmVsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VMaXN0RXZlbnRzUGFuZWwoJGNvbnRhaW5lciwgJGRldGFpbENvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RXZlbnRzKCkudGhlbihmdW5jdGlvbiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGV2ZW50c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBldmVudC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IGV2ZW50LmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBldmVudC5kYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gZXZlbnQubG9jYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudEh0bWwgPSAnXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtMyBldmVudF9wYW5lbFwiIGRhdGEtaWQ9XCInICsgaWQgKyAnXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1pbmZvXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4nICsgZGF0ZSArICc8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPicgKyBkZXNjcmlwdGlvbiArICc8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Pcmdhbml6ZWQgYnkgKG5hbWUpPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb290ZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGV2ZW50SHRtbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciAkZXZlbnRQYW5lbCA9ICQoJyAuZXZlbnRfcGFuZWwgJyk7XG5cbiAgICAgICAgICAgICAgICAkZXZlbnRQYW5lbC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYWtlRXZlbnRDYXJkKCQoX3RoaXMyKS5hdHRyKCdkYXRhLWlkJyksICRkZXRhaWxDb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtYWtlRXZlbnRDYXJkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VFdmVudENhcmQoaWQsICRkZXRhaWxDb250YWluZXIpIHtcbiAgICAgICAgICAgICRkZXRhaWxDb250YWluZXIuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldEV2ZW50KGlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gZGF0YS5ldmVudDtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBldmVudC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IGV2ZW50LmRhdGU7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gZXZlbnQubG9jYXRpb247XG5cbiAgICAgICAgICAgICAgICB2YXIgJGV2ZW50RGV0YWlsT3B0aW9ucyA9ICQoJyAuZXZlbnRfZGV0YWlsX29wdGlvbnMgJyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRDYXJkSHRtbCA9ICdcXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicm93IHRleHQtY2VudGVyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtbWQtNFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+SW5mb3JtYXRpb248L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4nICsgZGVzY3JpcHRpb24gKyAnPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Pcmdhbml6ZWQgYnkgKG5hbWUpPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLW1kLTRcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlBhcnRpY2lwYW50czwvaDI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtbWQtNFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+TG9jYXRpb248L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4nICsgbG9jYXRpb24gKyAnPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAnO1xuXG4gICAgICAgICAgICAgICAgJGRldGFpbENvbnRhaW5lci5hcHBlbmQoZXZlbnRDYXJkSHRtbCk7XG5cbiAgICAgICAgICAgICAgICAkZXZlbnREZXRhaWxPcHRpb25zLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtYWtlQ3JlYXRlRXZlbnRQYW5lbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlQ3JlYXRlRXZlbnRQYW5lbCgkY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyICRjcmVhdGVFdmVudERlc2NyaXB0aW9uID0gJCgnICNjcmVhdGVfZXZlbnRfZGVzY3JpcHRpb24gJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZUV2ZW50TG9jYXRpb24gPSAkKCcgI2NyZWF0ZV9ldmVudF9sb2NhdGlvbiAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlRXZlbnREYXRlID0gJCgnICNjcmVhdGVfZXZlbnRfZGF0ZSAnKTtcbiAgICAgICAgICAgIHZhciAkY3JlYXRlRXZlbnRTdWJtaXQgPSAkKCcgI2NyZWF0ZV9ldmVudF9zdWJtaXQgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZUV2ZW50Q2xlYXIgPSAkKCcgI2NyZWF0ZV9ldmVudF9jbGVhciAnKTtcblxuICAgICAgICAgICAgJGNyZWF0ZUV2ZW50U3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICRjcmVhdGVFdmVudERlc2NyaXB0aW9uLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJGNyZWF0ZUV2ZW50TG9jYXRpb24udmFsKCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6ICRjcmVhdGVFdmVudERhdGUudmFsKClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgX3RoaXMzLmFwaS5jcmVhdGVFdmVudChkYXRhKS50aGVuKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vZXZlbnQuYXBpXCI6MX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVIb2JieTogZnVuY3Rpb24gY3JlYXRlSG9iYnkoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLm5hbWUgfHwgIWRhdGEuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjcmVhdGVIb2JieSBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgbmFtZSBhbmQgYSBjYXRlZ29yeS4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvYmJpZXMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SG9iYnk6IGZ1bmN0aW9uIGdldEhvYmJ5KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBpZCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRIb2JiaWVzOiBmdW5jdGlvbiBnZXRIb2JiaWVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG9iYmllcy8nLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUhvYmJ5OiBmdW5jdGlvbiB1cGRhdGVIb2JieShkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIWRhdGEuaWQgfHwgIWRhdGEubmFtZSB8fCAhZGF0YS5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZUhvYmJ5IG11c3QgYmUgY2FsbGVkIHdpdGggYW4gaWQsIGEgbmFtZSwgYW5kIGEgY2F0ZWdvcnkuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9ob2JiaWVzLycgKyBvcHRpb25zLmlkLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzcyBIb2JieU1vZHVsZVxuICogRnVuY3Rpb25hbGl0eSB0YWtpbmcgQVBJIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gaG9iYmllcyBmcm9tIHRoZSBiYWNrZW5kIGFuZCBjcmVhdGluZyBjb21wb25lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfY2xhc3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBfY2xhc3MpO1xuXG4gICAgICAgIHRoaXMuYXBpID0gcmVxdWlyZSgnLi9ob2JieS5hcGknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NsYXNzO1xufSgpO1xuXG59LHtcIi4vaG9iYnkuYXBpXCI6M31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEJST1dTRVJJRlkgRU5UUlkgUE9JTlRcbiAqIFRoaXMgc2NyaXB0IGluc3RhbnRpYXRlcyBhbGwgcmVxdWlyZWQgbW9kdWxlcyBmb3IgU29ja2V0U29jaWFsIGFuZCBydW5zIGEgbGlzdCBvZiBjb21tYW5kcy5cbiAqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFVzZXJNb2R1bGUgPSByZXF1aXJlKCcuL3VzZXIvdXNlci5tb2R1bGUnKTtcbiAgICB2YXIgRXZlbnRNb2R1bGUgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50Lm1vZHVsZScpO1xuICAgIHZhciBIb2JieU1vZHVsZSA9IHJlcXVpcmUoJy4vaG9iYnkvaG9iYnkubW9kdWxlJyk7XG5cbiAgICB2YXIgVVNFUl9NT0RVTEUgPSBuZXcgVXNlck1vZHVsZSgpO1xuICAgIHZhciBFVkVOVF9NT0RVTEUgPSBuZXcgRXZlbnRNb2R1bGUoKTtcbiAgICB2YXIgSE9CQllfTU9EVUxFID0gbmV3IEhvYmJ5TW9kdWxlKCk7XG5cbiAgICB2YXIgJGNyZWF0ZVVzZXJQYW5lbCA9ICQoJyAjY3JlYXRlX3VzZXJfcGFuZWwgJyk7XG4gICAgdmFyICR1c2VyTGlzdFBhbmVsID0gJCgnICNhZG1pbl91c2VyX2xpc3QgJyk7XG4gICAgdmFyICRtZW1iZXJMaXN0ID0gJCgnICNtZW1iZXJfbGlzdCAnKTtcbiAgICB2YXIgJG1lbWJlckRldGFpbCA9ICQoJyAjbWVtYmVyX2RldGFpbCAnKTtcbiAgICB2YXIgJGV2ZW50TGlzdFBhbmVsID0gJCgnICNldmVudF9saXN0X3BhbmVsICcpO1xuICAgIHZhciAkY3JlYXRlRXZlbnRQYW5lbCA9ICQoJyAjY3JlYXRlX2V2ZW50X3BhbmVsICcpO1xuICAgIHZhciAkZXZlbnREZXRhaWwgPSAkKCcgI2V2ZW50X2RldGFpbCAnKTtcblxuICAgIC8vIEFkbWluXG4gICAgLy8gVVNFUl9NT0RVTEUubWFrZUNyZWF0ZVVzZXJQYW5lbCgkY3JlYXRlVXNlclBhbmVsKTtcbiAgICBVU0VSX01PRFVMRS5tYWtlVXNlckxpc3RQYW5lbCgkdXNlckxpc3RQYW5lbCk7XG5cbiAgICAvLyBFdmVudHNcbiAgICBFVkVOVF9NT0RVTEUubWFrZUNyZWF0ZUV2ZW50UGFuZWwoJGNyZWF0ZUV2ZW50UGFuZWwpO1xuICAgIEVWRU5UX01PRFVMRS5tYWtlTGlzdEV2ZW50c1BhbmVsKCRldmVudExpc3RQYW5lbCwgJGV2ZW50RGV0YWlsKTtcblxuICAgIC8vIE1lbWJlcnNcbiAgICBVU0VSX01PRFVMRS5tYWtlTWVtYmVySG9iYnlMaXN0KCRtZW1iZXJMaXN0LCAkbWVtYmVyRGV0YWlsKTtcbn0pO1xuXG59LHtcIi4vZXZlbnQvZXZlbnQubW9kdWxlXCI6MixcIi4vaG9iYnkvaG9iYnkubW9kdWxlXCI6NCxcIi4vdXNlci91c2VyLm1vZHVsZVwiOjh9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlVXNlcjogZnVuY3Rpb24gY3JlYXRlVXNlcihkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2lnbmluVXNlcjogZnVuY3Rpb24gc2lnbmluVXNlcihkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbmluJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0VXNlcnM6IGZ1bmN0aW9uIGdldFVzZXJzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvdXNlcnMnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2Vycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1c2Vycyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mb3JtYXRpb246IGZ1bmN0aW9uIGdldFVzZXJJbmZvcm1hdGlvbihpZCwgZmllbGRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvdXNlcnMvJyArIGlkICsgJy9pbmZvJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBmaWVsZHNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoaW5mbykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbmZvKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGVVc2VyUGFuZWxIdG1sOiBmdW5jdGlvbiBjcmVhdGVVc2VyUGFuZWxIdG1sKCkge1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgICA8c2VjdGlvbiBpZD1cXFwiY3JlYXRlX3VzZXJfZmxhc2hlclxcXCIgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgcGFuZWwtYWxlcnRcXFwiPjwvc2VjdGlvbj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXVzZXJcXFwiPjwvaT48aSBjbGFzcz1cXFwiZmEgZmEtcGx1c1xcXCI+PC9pPiAmbmJzcDtDcmVhdGUgVXNlclxcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cXG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XFxcImNyZWF0ZV91c2VyX2Zvcm1cXFwiIGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPk5hbWU8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJjcmVhdGVfdXNlcl9uYW1lXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5FbWFpbDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX2VtYWlsXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX3Bhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgcmVxdWlyZWQgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UaXRsZTwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcImNyZWF0ZV91c2VyX3RpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFib3V0IG1lPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwiY3JlYXRlX3VzZXJfYWJvdXRfbWVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cXFwicGFuZWwtZm9vdGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcImNyZWF0ZV91c2VyX2NsZWFyXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2hcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICBDbGVhclxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJjcmVhdGVfdXNlcl9zdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hcnJvdy1yaWdodFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1Ym1pdFxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCI7XG4gICAgfSxcbiAgICBjcmVhdGVVc2VyTGlzdFBhbmVsSHRtbDogZnVuY3Rpb24gY3JlYXRlVXNlckxpc3RQYW5lbEh0bWwoKSB7XG4gICAgICAgIHJldHVybiBcIlxcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgPGhlYWRlciBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDM+PGkgY2xhc3M9XFxcImZhIGZhLXVzZXJzXFxcIj48L2k+IFVzZXIgTGlzdDwvaDM+XFxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5IHVzZXJfbGlzdF9wYW5lbFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XFxcInRhYmxlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlVzZXI8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPklEPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cXFwidXNlcl9saXN0X3Jvd3NcXFwiPjwvdGJvZHk+XFxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cXFwicGFuZWwtZm9vdGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJ1c2VyX2xpc3RfZmlsdGVyIGZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIkZpbHRlclxcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgIFwiO1xuICAgIH0sXG4gICAgY3JlYXRlTWVtYmVyUHJvZmlsZUNhcmRIdG1sOiBmdW5jdGlvbiBjcmVhdGVNZW1iZXJQcm9maWxlQ2FyZEh0bWwob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtZW1iZXJfcHJvZmlsZV9jYXJkXFxcIj5cXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJjb2wteHMtMTIgY29sLW1kLTRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiaHR0cDovL3BsYWNlaG9sZC5pdC8yMjB4MjIwXFxcIiBjbGFzcz1cXFwiaW1nLXJlc3BvbnNpdmUgY2VudGVyLWJsb2NrXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb20gY2xhc3M9XFxcImNvbC14cy0xMiBjb2wtbWQtOFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5cIiArIG9wdGlvbnMubmFtZSArIFwiPC9oMz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlwiICsgb3B0aW9ucy5lbWFpbCArIFwiPC9oND5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLTJ4IGZhLWZhY2Vib29rXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS0yeCBmYS10d2l0dGVyXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlY3Rpb20+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxociAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cXFwiY29sLW1kLTEyIG1lbWJlcl9pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlRpdGxlPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XCIgKyBvcHRpb25zLnRpdGxlICsgXCI8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QWJvdXQgbWU8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cIiArIG9wdGlvbnMuYWJvdXRNZSArIFwiPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkhvYmJpZXM8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Ib2JiaWVzPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIjtcbiAgICB9XG59O1xuXG59LHt9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBAY2xhc3MgVXNlck1vZHVsZVxuICogRnVuY3Rpb25hbGl0eSB0YWtpbmcgQVBJIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdXNlcnMgZnJvbSB0aGUgYmFja2VuZCBhbmQgY3JlYXRpbmcgY29tcG9uZW50cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gX2NsYXNzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgX2NsYXNzKTtcblxuICAgICAgICB0aGlzLmFwaSA9IHJlcXVpcmUoJy4vdXNlci5hcGknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYSBwYW5lbCB3aXRoIGZ1bmN0aW9uYWxpdHkgdG8gY3JlYXRlIGEgbmV3IHVzZXIuXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICRjb250YWluZXIgLSBBIGpRdWVyeSBzZWxlY3Rvci5cbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKF9jbGFzcywgW3tcbiAgICAgICAga2V5OiAnbWFrZUNyZWF0ZVVzZXJQYW5lbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlQ3JlYXRlVXNlclBhbmVsKCRjb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoISRjb250YWluZXIpIHRocm93IG5ldyBFcnJvcignbWFrZUNyZWF0ZVVzZVBhbmVsIG11c3QgYmUgZ2l2ZW4gYSBjb250YWluZXInKTtcblxuICAgICAgICAgICAgdmFyIGNyZWF0ZVVzZXJQYW5lbEh0bWwgPSByZXF1aXJlKCcuL3VzZXIuaHRtbCcpLmNyZWF0ZVVzZXJQYW5lbEh0bWw7XG4gICAgICAgICAgICAvLyBUT0RPOiBUZXN0IG91dHB1dCB0byBjaGVjayBmb3IgZmxhc2hlclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoY3JlYXRlVXNlclBhbmVsSHRtbCk7XG4gICAgICAgICAgICAvLyBUT0RPOiB0ZXN0IGNvbnRhaW5lciBoYXMgcGFuZWxcblxuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyQ2xlYXIgPSAkKCcgI2NyZWF0ZV91c2VyX2NsZWFyICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyU3VibWl0ID0gJCgnICNjcmVhdGVfdXNlcl9zdWJtaXQgJyk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IFRlc3QgYnV0dG9ucyBleGlzdFxuXG4gICAgICAgICAgICAkY3JlYXRlVXNlckNsZWFyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5jbGVhckNyZWF0ZVVzZXIoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRjcmVhdGVVc2VyU3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5jcmVhdGVVc2VyKGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IHRlc3QgY3JlYXRlIHVzZXIgY2xlYXIgYnV0dG9tIGNsZWFycyB0aGUgdXNlclxuICAgICAgICAgICAgLy8gVE9ETzogdGVzdCBjcmVhdGUgdXNlciBzdWJtaXQgYnV0dG9uIGFkZHMgdGhlIHVzZXIgdG8gdGhlIGRiXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2xlYXIgdGhlICdlbWFpbCcgYW5kICdwYXNzd29yZCcgZmllbGRzIGluIHRoZSAnQ3JlYXRlIFVzZXInIGZvcm0uXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIC0gQW55IHBhc3NlZCBldmVudHMgZnJvbSBhbiBldmVudCBoYW5kbGluZyBtZXRob2QuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjbGVhckNyZWF0ZVVzZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXJDcmVhdGVVc2VyKGUpIHtcbiAgICAgICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlck5hbWUgPSAkKCcgI2NyZWF0ZV91c2VyX25hbWUgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJFbWFpbCA9ICQoJyAjY3JlYXRlX3VzZXJfZW1haWwgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJQYXNzd29yZCA9ICQoJyAjY3JlYXRlX3VzZXJfcGFzc3dvcmQgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJUaXRsZSA9ICQoJyAjY3JlYXRlX3VzZXJfdGl0bGUgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJBYm91dE1lID0gJCgnICNjcmVhdGVfdXNlcl9hYm91dF9tZSAnKTtcblxuICAgICAgICAgICAgJGNyZWF0ZVVzZXJOYW1lLnZhbCgnJyk7XG4gICAgICAgICAgICAkY3JlYXRlVXNlckVtYWlsLnZhbCgnJyk7XG4gICAgICAgICAgICAkY3JlYXRlVXNlclBhc3N3b3JkLnZhbCgnJyk7XG4gICAgICAgICAgICAkY3JlYXRlVXNlclRpdGxlLnZhbCgnJyk7XG4gICAgICAgICAgICAkY3JlYXRlVXNlckFib3V0TWUudmFsKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2luZyB0aGUgZm9ybSBkYXRhLCBjcmVhdGUgYSBuZXcgdXNlciBpbiB0aGUgZGF0YWJhc2UuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIC0gQW55IHBhc3NlZCBldmVudHMgZnJvbSBhbiBldmVudCBoYW5kbGluZyBtZXRob2QuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjcmVhdGVVc2VyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVVzZXIoZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkY3JlYXRlVXNlckZsYXNoZXIgPSAkKCcgI2NyZWF0ZV91c2VyX2ZsYXNoZXIgJyk7XG4gICAgICAgICAgICB2YXIgJGNyZWF0ZVVzZXJOYW1lID0gJCgnICNjcmVhdGVfdXNlcl9uYW1lICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyRW1haWwgPSAkKCcgI2NyZWF0ZV91c2VyX2VtYWlsICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyUGFzc3dvcmQgPSAkKCcgI2NyZWF0ZV91c2VyX3Bhc3N3b3JkICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyVGl0bGUgPSAkKCcgI2NyZWF0ZV91c2VyX3RpdGxlICcpO1xuICAgICAgICAgICAgdmFyICRjcmVhdGVVc2VyQWJvdXRNZSA9ICQoJyAjY3JlYXRlX3VzZXJfYWJvdXRfbWUgJyk7XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICRjcmVhdGVVc2VyTmFtZS52YWwoKSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJGNyZWF0ZVVzZXJFbWFpbC52YWwoKSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJGNyZWF0ZVVzZXJQYXNzd29yZC52YWwoKSxcbiAgICAgICAgICAgICAgICB0aXRsZTogJGNyZWF0ZVVzZXJUaXRsZS52YWwoKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBhYm91dE1lOiAkY3JlYXRlVXNlckFib3V0TWUudmFsKCkgfHwgJydcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghZGF0YS5lbWFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmbGFzaENyZWF0ZVVzZXJFcnJvcignQW4gZW1haWwgaXMgcmVxdWlyZWQgdG8gam9pbiBTb2NrZXRTb2NpYWwuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaXNEZWFsZXJTb2NrZXRFbWFpbCA9IC9eWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSsoXFwuWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSspKkBkZWFsZXJzb2NrZXQuY29tJC8udGVzdChkYXRhLmVtYWlsKTtcblxuICAgICAgICAgICAgaWYgKCFpc0RlYWxlclNvY2tldEVtYWlsKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IoJ0EgRGVhbGVyU29ja2V0IGVtYWlsIGlzIHJlcXVpcmVkIHRvIGpvaW4gU29ja2V0U29jaWFsLiAoQGRlYWxlcnNvY2tldC5jb20pJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXNzd29yZC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyRXJyb3IoJ1lvdXIgcGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCBzaXggY2hhcmFjdGVycy4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmNyZWF0ZVVzZXIoZGF0YSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkdXNlckxpc3RQYW5lbFBhbmVscyA9ICQoJyAudXNlcl9saXN0X3Jvd3MgJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgZmxhc2hDcmVhdGVVc2VyU3VjY2VzcyhyZXN1bHQuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ3JlYXRlVXNlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMy51cGRhdGVVc2VyTGlzdFBhbmVsKCR1c2VyTGlzdFBhbmVsUGFuZWxzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBmbGFzaENyZWF0ZVVzZXJFcnJvcihyZXN1bHQuZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBkYXRhIHJlY2VpdmVkIGluIGNyZWF0ZVVzZXIgbWV0aG9kJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTaG93IGEgZ3JlZW4gYWxlcnQgbm90aWZ5aW5nIHRoZSB1c2VyIHRoYXQgYSBuZXcgdXNlciB3YXMgY3JlYXRlZC5cbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgZm9yIHRoZSBmbGFzaGVyLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBmbGFzaENyZWF0ZVVzZXJTdWNjZXNzKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIucmVtb3ZlQ2xhc3MoKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuYWRkQ2xhc3MoJ2FsZXJ0Jyk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmFkZENsYXNzKCdhbGVydC1zdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLnRleHQobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmZhZGVJbigpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNob3cgYSByZWQgYWxlcnQgbm90aWZ5aW5nIHRoZSB1c2VyIHRoYXQgYSBuZXcgdXNlciB3YXMgbm90IGNyZWF0ZWQuXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIGZvciB0aGUgZmxhc2hlci5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gZmxhc2hDcmVhdGVVc2VyRXJyb3IobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5hZGRDbGFzcygnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckZsYXNoZXIuYWRkQ2xhc3MoJ2FsZXJ0LWRhbmdlcicpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci50ZXh0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICRjcmVhdGVVc2VyRmxhc2hlci5mYWRlSW4oKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJGbGFzaGVyLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDbGVhciB0aGUgJ2VtYWlsJyBhbmQgJ3Bhc3N3b3JkJyBmaWVsZHMgaW4gdGhlICdDcmVhdGUgVXNlcicgZm9ybS5cbiAgICAgICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIC0gQW55IHBhc3NlZCBldmVudHMgZnJvbSBhbiBldmVudCBoYW5kbGluZyBtZXRob2QuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyQ3JlYXRlVXNlcihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkY3JlYXRlVXNlckVtYWlsLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZVVzZXJQYXNzd29yZC52YWwoJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF0dGFjaCBhIHBhbmVsIHdpdGggZnVuY3Rpb25hbGl0eSB0byBkaXNwbGF5IGEgbGlzdCBvZiB1c2Vycy5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9ICRjb250YWluZXIgLSBBIGpRdWVyeSBzZWxlY3Rvci5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ21ha2VVc2VyTGlzdFBhbmVsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1ha2VVc2VyTGlzdFBhbmVsKCRjb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciB1c2VyTGlzdFBhbmVsSHRtbCA9IHJlcXVpcmUoJy4vdXNlci5odG1sJykuY3JlYXRlVXNlckxpc3RQYW5lbEh0bWw7XG5cbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKHVzZXJMaXN0UGFuZWxIdG1sKTtcblxuICAgICAgICAgICAgdmFyICR1c2VyTGlzdFBhbmVsID0gJCgnIC51c2VyX2xpc3Rfcm93cyAnKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VyTGlzdFBhbmVsKCR1c2VyTGlzdFBhbmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhciBhIHVzZXIgbGlzdCwgZ2V0IGFsbCB1c2VycyBmcm9tIHRoZSBzZXJ2ZXIsIHRoZW4gaXRlcmF0ZSBvdmVyIHRoZW0gYW5kIG1ha2UgdGFibGUgcm93cy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3VwZGF0ZVVzZXJMaXN0UGFuZWwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVXNlckxpc3RQYW5lbCgkdXNlckxpc3RQYW5lbCkge1xuICAgICAgICAgICAgJHVzZXJMaXN0UGFuZWwuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFVzZXJzKCkudGhlbihmdW5jdGlvbiAodXNlcnMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdXNlcnMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHVzZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc20gYnRuLWRlZmF1bHRcIj4uLi48L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPicgKyB1c2VyLmVtYWlsICsgJzwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4nICsgdXNlci5pZCArICc8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgICAgICAgICAnO1xuXG4gICAgICAgICAgICAgICAgICAgICR1c2VyTGlzdFBhbmVsLmFwcGVuZChyb3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9ICRjb250YWluZXIgLSBBIGpRdWVyeSBzZWxlY3RvciAodGJvZHkpLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gJGRldGFpbENvbnRhaW5lciAtIEFub3RoZXIgc2VsZWN0b3IgZm9yIGRldGFpbCB2aWV3LlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbWFrZU1lbWJlckhvYmJ5TGlzdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlTWVtYmVySG9iYnlMaXN0KCRjb250YWluZXIsICRkZXRhaWxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFVzZXJzKCkudGhlbihmdW5jdGlvbiAodXNlcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdXNlcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW1haWwgPSB1c2VyLmVtYWlsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cIm1lbWJlcl9yb3dcIiBkYXRhLWlkPVwiJyArIGlkICsgJ1wiIGRhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiIGRhdGEtZW1haWw9XCInICsgZW1haWwgKyAnXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4nICsgbmFtZSArICc8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JyArIGVtYWlsICsgJzwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXG4gICAgICAgICAgICAgICAgICAgICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciAkbWVtYmVyUm93ID0gJCgnIC5tZW1iZXJfcm93ICcpO1xuXG4gICAgICAgICAgICAgICAgJG1lbWJlclJvdy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYWtlTWVtYmVyUHJvZmlsZUNhcmQoJChfdGhpczQpLCAkZGV0YWlsQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoeyBlcnI6IGVyciB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkbWVtYmVyUm93IC0gQSByb3cgd2l0aCBkYXRhIGF0dHJpYnV0ZXMuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSAkZGV0YWlsQ29udGFpbmVyIC0gQSBqUXVlcnkgc2VsZWN0b3IuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtYWtlTWVtYmVyUHJvZmlsZUNhcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbWFrZU1lbWJlclByb2ZpbGVDYXJkKCRtZW1iZXJSb3csICRkZXRhaWxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICRtZW1iZXJSb3cuYXR0cignZGF0YS1pZCcpO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkbWVtYmVyUm93LmF0dHIoJ2RhdGEtbmFtZScpO1xuICAgICAgICAgICAgdmFyIGVtYWlsID0gJG1lbWJlclJvdy5hdHRyKCdkYXRhLWVtYWlsJyk7XG5cbiAgICAgICAgICAgIHZhciBpbmZvVG9HZXQgPSBbJ3RpdGxlJywgJ2Fib3V0TWUnXTtcblxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VXNlckluZm9ybWF0aW9uKGlkLCBpbmZvVG9HZXQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IHJlc3VsdC5pbmZvLnRpdGxlO1xuICAgICAgICAgICAgICAgIHZhciBhYm91dE1lID0gcmVzdWx0LmluZm8uYWJvdXRNZTtcblxuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0geyBuYW1lOiBuYW1lLCBlbWFpbDogZW1haWwsIHRpdGxlOiB0aXRsZSwgYWJvdXRNZTogYWJvdXRNZSB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lbWJlclByb2ZpbGVDYXJkSHRtbCA9IHJlcXVpcmUoJy4vdXNlci5odG1sJykuY3JlYXRlTWVtYmVyUHJvZmlsZUNhcmRIdG1sKG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgJGRldGFpbENvbnRhaW5lci5odG1sKCcnKTtcblxuICAgICAgICAgICAgICAgICRkZXRhaWxDb250YWluZXIuYXBwZW5kKG1lbWJlclByb2ZpbGVDYXJkSHRtbCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIF9jbGFzcztcbn0oKTtcblxufSx7XCIuL3VzZXIuYXBpXCI6NixcIi4vdXNlci5odG1sXCI6N31dfSx7fSxbNV0pO1xuIl0sImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
