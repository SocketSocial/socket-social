module.exports = {
    createParticipant: data => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: '/participants',
                dataType: 'JSON',
                data,
                success: participant => resolve(participant),
                error: err => reject(err)
            });
        });
    },
    getParticipants: data => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: '/participants',
                dataType: 'JSON',
                data,
                success: participant => resolve(participant),
                error: err => reject(err)
            });
        });
    }
};
