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
        const createUserPanelHtml   = require('./user.html').createUserPanelHtml;
        // TODO: Test output to check for flasher
        $container.append(createUserPanelHtml);

        const $createUserClear   = $(' #create_user_clear ');
        const $createUserSubmit  = $(' #create_user_submit ');

        $createUserClear.on('click', e => this.clearCreateUser(e));
        $createUserSubmit.on('click', e => this.createUser(e));
    }

    /**
     * Clear the 'email' and 'password' fields in the 'Create User' form.
     * @param {object} e - Any passed events from an event handling method.
     */
    clearCreateUser(e) {
        if (e) e.preventDefault();

        const $createUserEmail      = $(' #create_user_email ');
        const $createUserPassword   = $(' #create_user_password ');

        $createUserEmail.val('');
        $createUserPassword.val('');
    }

    /**
     * Using the form data, create a new user in the database.
     * @param {object} e - Any passed events from an event handling method.
     */
    createUser(e) {
        if (e) e.preventDefault();

        const $createUserFlasher    = $(' #create_user_flasher ');
        const $createUserEmail      = $(' #create_user_email ');
        const $createUserPassword   = $(' #create_user_password ');

        const data = {
            email: $createUserEmail.val(),
            password: $createUserPassword.val()
        };

        if (!data.email.length) {
            flashCreateUserError('An email is required to join SocketSocial.');
            return false;
        }

        if (!data.password.length) {
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

};
