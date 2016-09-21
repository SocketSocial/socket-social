$(document).ready(() => {

    function createEvent(options) {
        return new Promise((resolve, reject) => {
            if (!options.date || !options.location || !options.description) {
                console.error('createEvent must be called with a date, a location, and a description.');
                reject();
            }

            const data = {
                date: options.date,
                location: options.location,
                description: options.description
            };

            $.ajax({
                type: 'POST',
                url: `/events`,
                dataType: 'JSON',
                data,
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    }

    function getEvent(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `/events/${id}`,
                dataType: 'JSON',
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    }

    function getEvents() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: '/events/',
                dataType: 'JSON',
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    }

    function updateEvent(options) {
        return new Promise((resolve, reject) => {
            if (!options.id || !options.date || !options.location || !options.description) {
                console.error('createEvent must be called with an id, a date, a location, and a description.');
                reject();
            }

            const data = {
                id: options.id,
                date: options.date,
                description: options.description,
                location: options.location
            }

            $.ajax({
                type: 'POST',
                url: `/events/${options.id}`,
                dataType: 'JSON',
                data,
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    }

});
