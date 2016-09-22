/**
 * @class HobbyModule
 * Functionality taking API information related to hobbies from the backend and creating components.
 */
module.exports = class {

    constructor() {
        this.api = require('./hobby.methods');
    }

};
