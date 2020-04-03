
const moment = require('moment');

function formatTime(applicationDataValues)
{
    let outDatetime = applicationDataValues.out_datetime;
    let plannedReturnDatetime = applicationDataValues.planned_return_datetime;
    let createdAtDatetime = applicationDataValues.created_at;

    //ss https://stackoverflow.com/a/25150793/7574023
    let start_date = moment(outDatetime, 'YYYY-MM-DD HH:mm:ss');
    let end_date = moment(plannedReturnDatetime, 'YYYY-MM-DD HH:mm:ss');

    //ss https://stackoverflow.com/a/18624295/7574023
    let duration = moment.duration(end_date.diff(start_date));

    //ss http://www.expertphp.in/article/node-js-calculate-datetime-difference-in-hours-minutes-and-seconds-moment-js
    let intervalInHours = Math.round(duration.asHours());

    applicationDataValues.out_datetime = moment(outDatetime).format('MM.DD.YYYY, H:m');
    applicationDataValues.planned_return_datetime = moment(plannedReturnDatetime).format('MM.DD.YYYY, H:m') + " (" + intervalInHours + " ժամ տևողությամբ)";
    applicationDataValues.created_at = moment(createdAtDatetime).format('MM.DD.YYYY, H:m');

    return applicationDataValues;
}

module.exports = {
    formatTime,
};
