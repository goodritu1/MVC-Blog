
module.exports = {
    format_date: (date) => {
        console.log('Received date:', date);
        if (!date || !(date instanceof Date)) {
            throw new TypeError('Invalid date provided');
        }
        return date.toLocaleDateString();
    },
};
