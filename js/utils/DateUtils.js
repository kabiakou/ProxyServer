const moment = require('moment')

const DATE_TEMPLATE = 'YYYY-MM-DD'
const now = moment()

const getDayOfTheCurrentWeek = (dayNumber) => {
    return now.day(dayNumber).format(DATE_TEMPLATE)
}

module.exports = { getDayOfTheCurrentWeek };