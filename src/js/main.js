$(document).ready(() => {
    // Module Dependencies
    const UserModule  = require('./user/user.module');
    const EventModule = require('./event/event.module');
    const HobbyModule = require('./hobby/hobby.module');

    // Users
    const USER_MODULE = new UserModule();

    const $createUserPanel = $(' #create_user_panel ');
    const $userList        = $(' #admin_user_list ');

    USER_MODULE.makeCreateUserPanel($createUserPanel);
    USER_MODULE.makeUserList($userList);

    // Events
    const EVENT_MODULE = new EventModule();

    // Hobbies
    const HOBBY_MODULE = new HobbyModule();

});
