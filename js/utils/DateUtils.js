const { previousMonday, previousFriday, format } = require("date-fns")

const DATE_FORMAT = "yyyy-MM-dd"

const previousFridayDateTime = previousFriday(new Date())
const previousMondayDateTime = previousMonday(previousFridayDateTime)

const previousMondayDate = format(previousMondayDateTime, DATE_FORMAT)
const previousFridayDate = format(previousFridayDateTime, DATE_FORMAT)

module.exports = { previousMondayDate, previousFridayDate };