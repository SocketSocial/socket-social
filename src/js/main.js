$(document).ready(() => {
    // Module Dependencies
    const UserModule = require('./user/user.module');

    // API methods
    const event = require('./api/event.methods');   // Event API methods
    const hobby = require('./api/hobby.methods');   // Hobby API methods

    const USER_MODULE = new UserModule();

    const $createUserPanel = $(' #create_user_panel ');
    const $userList        = $(' #admin_user_list ');

    USER_MODULE.makeCreateUserPanel($createUserPanel);
    USER_MODULE.makeUserList($userList);

});
