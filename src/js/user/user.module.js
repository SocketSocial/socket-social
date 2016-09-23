/**
 * @class UserModule
 * Functionality taking API information related to users from the backend and creating components.
 */
module.exports = class {

    constructor() {
        this.api = require('./user.api');
    }

    /**
     * Attach a panel with functionality to create a new user.
     * @param {object} $container - A jQuery selector.
     */
    makeCreateUserPanel($container) {
        if (!$container) throw new Error('makeCreateUsePanel must be given a container');

        const createUserPanelHtml   = require('./user.html').createUserPanelHtml;
        // TODO: Test output to check for flasher
        $container.append(createUserPanelHtml);
        // TODO: test container has panel

        const $createUserClear   = $(' #create_user_clear ');
        const $createUserSubmit  = $(' #create_user_submit ');

        // TODO: Test buttons exist

        $createUserClear.on('click', e => this.clearCreateUser(e));
        $createUserSubmit.on('click', e => this.createUser(e));

        // TODO: test create user clear buttom clears the user
        // TODO: test create user submit button adds the user to the db
    }

    /**
     * Clear the 'email' and 'password' fields in the 'Create User' form.
     * @param {object} e - Any passed events from an event handling method.
     */
    clearCreateUser(e) {
        if (e) e.preventDefault();

        const $createUserName       = $(' #create_user_name ');
        const $createUserEmail      = $(' #create_user_email ');
        const $createUserPassword   = $(' #create_user_password ');
        const $createUserTitle      = $(' #create_user_title ');
        const $createUserAboutMe    = $(' #create_user_about_me ');

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
    createUser(e) {
        if (e) e.preventDefault();

        const $createUserFlasher    = $(' #create_user_flasher ');
        const $createUserName       = $(' #create_user_name ');
        const $createUserEmail      = $(' #create_user_email ');
        const $createUserPassword   = $(' #create_user_password ');
        const $createUserTitle      = $(' #create_user_title ');
        const $createUserAboutMe    = $(' #create_user_about_me ');

        const data = {
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

        const isDealerSocketEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@dealersocket.com$/.test(data.email);

        if (!isDealerSocketEmail) {
            flashCreateUserError('A DealerSocket email is required to join SocketSocial. (@dealersocket.com)');
            return false;
        }

        if (data.password.length < 6) {
            flashCreateUserError('Your password must be at least six characters.');
            return false;
        }

        this.api.createUser(data)
            .then(result => {
                if (result.success) {
                    const $userListPanelPanels = $(' .user_list_rows ');

                    flashCreateUserSuccess(result.success);
                    clearCreateUser();

                    this.updateUserListPanel($userListPanelPanels);
                } else if (result.error) {
                    flashCreateUserError(result.error);
                } else {
                    throw new Error('Unexpected data received in createUser method');
                }
            },
            err => console.error(err));

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
                setTimeout(() => {
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
                setTimeout(() => {
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
    makeUserListPanel($container) {
        const userListPanelHtml = require('./user.html').createUserListPanelHtml;

        $container.append(userListPanelHtml);

        const $userListPanel = $(' .user_list_rows ');

        this.updateUserListPanel($userListPanel);
    }

    /**
     * Clear a user list, get all users from the server, then iterate over them and make table rows.
     */
    updateUserListPanel($userListPanel) {
        $userListPanel.html('');

        this.api.getUsers()
            .then(users => {
                for (let i = users.length - 1; i > 0; i--) {
                    let user = users[i];
                    let row = `
                        <tr>
                            <td>
                                <button class="btn btn-sm btn-default">...</button>
                            </td>
                            <td>${user.email}</td>
                            <td>${user.id}</td>
                        </tr>
                    `;

                    $userListPanel.append(row);
                }
            },
            err => console.error(err));
    }

    /**
     *
     * @param {object} $container - A jQuery selector (tbody).
     * @param {object} $detailContainer - Another selector for detail view.
     */
    makeMemberHobbyList($container, $detailContainer) {
        const _this = this;

        this.api.getUsers()
            .then(users => {
                for (let user of users) {
                    let id    = user.id;
                    let name  = user.name;
                    let email = user.email;

                    let row = `
                        <tr class="member_row" data-id="${id}" data-name="${name}" data-email="${email}">
                            <td>${name}</td>
                            <td>${email}</td>
                        </tr>
                    `;

                    $container.append(row);
                }

                const $memberRow = $(' .member_row ');

                $memberRow.each(function () {
                    $(this).on('click', () => {
                        _this.makeMemberProfileCard($(this), $detailContainer);
                    });
                });
            },
            err => console.error({ err }));
    }

    /**
     * @param {object} $memberRow - A row with data attributes.
     * @param {object} $detailContainer - A jQuery selector.
     */
    makeMemberProfileCard($memberRow , $detailContainer, options) {
        const id    = $memberRow.attr('data-id') || options.userId;
        const name  = $memberRow.attr('data-name') || options.name;
        const email = $memberRow.attr('data-email') || options.email;

        const infoToGet = ['title', 'aboutMe'];

        this.api.getUserInformation(id, infoToGet)
            .then(result => {
                const title   = result.info.title;
                const aboutMe = result.info.aboutMe;

                const options = { name, email, title, aboutMe };

                const memberProfileCardHtml = require('./user.html').createMemberProfileCardHtml(options);

                $detailContainer.html('');
                $detailContainer.append(memberProfileCardHtml);
            },
            err => console.error(err));
    }

    /**
     *
     */
    signinUser() {
        const $signinEmail      = $(' #signin_user_email ')
        const $signinPassword   = $(' #signin_user_password ');
        const $signinSubmit     = $(' #signin_user_submit ');
        const $signinClear      = $(' #signin_user_clear ');

        $signinSubmit.on('click', e => {
            e.preventDefault();

            const data = {
                email: $signinEmail.val(),
                password: $signinPassword.val()
            };

            this.api.signinUser(data)
                .then(user => {
                    window.location.href = '/event-calendar';
                },
                err => console.error(err));
        });

        $signinClear.on('click', e => {
            e.preventDefault();

            $signinEmail.val('');
            $signinPassword.val('');
        });
    }

    /**
     *
     */
    signupUser() {
        const $signupUserName           = $(' #signup_user_name ');
        const $signupUserEmail          = $(' #signup_user_email ');
        const $signupUserPassword       = $(' #signup_user_password ');
        const $signupUserPasswordVerify = $(' #signup_user_password_verify ');
        const $signupUserSubmit         = $(' #signup_user_submit ');
        const $signupUserClear          = $(' #signup_user_clear ');

        $signupUserSubmit.on('click', e => {
            e.preventDefault();

            if ($signupUserPassword.val() !== $signupUserPasswordVerify.val()) throw new Error('Both password must match.');

            const data = {
                name: $signupUserName.val(),
                email: $signupUserEmail.val(),
                password: $signupUserPassword.val()
            };

            this.api.createUser(data)
                .then(user => {
                    window.location.href = '/';
                },
                err => console.error(err));

        });

        $signupUserClear.on('click', e => {
            e.preventDefault();

            $signupUserEmail.val('');
            $signupUserPassword.val('');
            $signupUserPasswordVerify.val('');
        });
    }
};
