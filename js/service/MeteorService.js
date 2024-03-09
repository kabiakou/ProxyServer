const dateUtils = require('../utils/DateUtils.js')
const requestUtils = require('../utils/RequestUtils.js')

const monday = dateUtils.getDayOfTheCurrentWeek(1)
const friday = dateUtils.getDayOfTheCurrentWeek(5)

const getMeteorsData = async () => {
    const meteorsData = await requestUtils.getMeteorsWithinPeriodRequest(monday, friday)
    return `Amount of meteors were seen from ${monday} to ${friday}: ${meteorsData.data.element_count}`
}

module.exports = { getMeteorsData }