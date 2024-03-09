const dateUtils = require('../utils/DateUtils.js')
const requestUtils = require('../utils/RequestUtils.js')

const monday = dateUtils.getDayOfTheCurrentWeek(1)
const friday = dateUtils.getDayOfTheCurrentWeek(5)

const getAsteroidsData = async () => {
    const asteroidsData = await requestUtils.getAsteroidsWithinPeriodRequest(monday, friday)
    return `Amount of asteroids were seen from ${monday} to ${friday}: ${asteroidsData.data.element_count}`
}

module.exports = { getAsteroidsData }