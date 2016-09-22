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

    // Admin
    USER_MODULE.makeCreateUserPanel($createUserPanel);
    USER_MODULE.makeUserListPanel($userListPanel);

    // Members
    USER_MODULE.makeMemberHobbyList($memberList);

});
