module.exports = {
    createEvent: data => {
        return new Promise((resolve, reject) => {
            if (!data.date || !data.location || !data.description) {
                console.error('createEvent must be called with a date, a location, and a description.');
                reject();
            }

            $.ajax({
                type: 'POST',
                url: `/events`,
                dataType: 'JSON',
                data,
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    },
    getEvent: id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `/events/${id}`,
                dataType: 'JSON',
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    },
    getEvents: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: '/events/',
                dataType: 'JSON',
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    },
    updateEvent: data => {
        return new Promise((resolve, reject) => {
            if (!data.id || !data.date || !data.location || !data.description) {
                console.error('updateEvent must be called with an id, a date, a location, and a description.');
                reject();
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
}
