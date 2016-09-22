$(document).ready(() => {
    const user  = require('./api/user.methods');    // User API methods
    const event = require('./api/event.methods');   // Event API methods
    const hobby = require('./api/hobby.methods');   // Hobby API methods

    updateUserList();                               // Initialize user lists

    // Create User
    (() => {
        const $createUserForm       = $(' #create_user_form ');
        const $createUserFlasher    = $(' #create_user_flasher ');
        const $createUserEmail      = $(' #create_user_email ');
        const $createUserPassword   = $(' #create_user_password ');
        const $createUserClear      = $(' #create_user_clear ');
        const $createUserSubmit     = $(' #create_user_submit ');

        $createUserFlasher.hide();
        $createUserClear.on('click', clearCreateUser);
        $createUserSubmit.on('click', e => {
            e.preventDefault();

            const data = {
                email: $createUserEmail.val(),
                password: $createUserPassword.val()
            };

            user.createUser(data)
                .then(result => {
                    if (result.success) {
                        flashCreateUserSuccess(result.success);
                        clearCreateUser();
                        updateUserList();
                    } else if (result.error) {
                        flashCreateUserError(result.error);
                    } else {
                        throw new Error('Unexpected fetch in createUser method');
                    }
                },
                err => console.error(err));
        });

        /**
         * Clear the 'email' and 'password' fields in the 'Create User' form.
         * @param {object} e - Any passed events from an event handling method.
         */
        function clearCreateUser(e) {
            if (e) e.preventDefault();
            $createUserEmail.val('');
            $createUserPassword.val('');
        }

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

    })();

    /**
     * Clear the user list, get all users from the server, then iterate over them and make table rows.
     */
    function updateUserList() {
        const $userTable = $('tbody', ' .user_table ');

        $userTable.html('');

        user.getUsers()
            .then(users => {
                for (let user of users) {
                    let row = `
                        <tr>
                            <td>${user.email}</td>
                            <td>${user.id}</td>
                        </tr>
                    `;

                    $userTable.append(row);
                }
            },
            err => console.error(err));
    }

});
