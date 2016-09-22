module.exports = {
    createHobby: data => {
        return new Promise((resolve, reject) => {
            if (!data.name || !data.category) {
                console.error('createHobby must be called with a name and a category.');
                reject();
            }

            $.ajax({
                type: 'POST',
                url: `/hobbies`,
                dataType: 'JSON',
                data,
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    },
    getHobby: id => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `/hobbies/${id}`,
                dataType: 'JSON',
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    },
    getHobbies: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: '/hobbies/',
                dataType: 'JSON',
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    },
    updateHobby: data => {
        return new Promise((resolve, reject) => {
            if (!data.id || !data.name || !data.category) {
                console.error('updateHobby must be called with an id, a name, and a category.');
                reject();
            }

            $.ajax({
                type: 'POST',
                url: `/hobbies/${options.id}`,
                dataType: 'JSON',
                data,
                success: result => resolve(result),
                error: err => reject(err)
            });
        });
    }
};
