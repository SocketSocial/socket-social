'use strict';

module.exports = function (models) {
    const User  = models.User;
    const Hobby = models.Hobby;

    User.hasMany(Hobby, { as: 'Hobbies' });
};
