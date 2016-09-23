/**
 * BROWSERIFY ENTRY POINT
 * This script instantiates all required modules for SocketSocial and runs a list of commands.
 */
$(document).ready(() => {

    const UserModule  = require('./user/user.module');
    const EventModule = require('./event/event.module');
    const HobbyModule = require('./hobby/hobby.module');

    const USER_MODULE  = new UserModule();
    const EVENT_MODULE = new EventModule();
    const HOBBY_MODULE = new HobbyModule();

    const $createUserPanel      = $(' #create_user_panel ');
    const $userListPanel        = $(' #admin_user_list ');
    const $memberList           = $(' #member_list ');
    const $memberDetail         = $(' #member_detail ');
    const $eventListPanel       = $(' #event_list_panel ');
    const $createEventPanel     = $(' #create_event_panel ');
    const $eventDetail          = $(' #event_detail ');

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
    const $logo = $(' .logo ');

    $logo.on('click', e => {
        e.preventDefault();

        window.location.href = '/';
    });

    // Sign out
    const $signoutUser = $(' #signout_user ');

    $signoutUser.on('click', e => {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/signout',
            success: user => {
                window.location.href = '/';
            },
            error: err => console.error(err)
        })
    });

});
