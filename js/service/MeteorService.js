const dateUtils = require('../utils/DateUtils.js')
const requestUtils = require('../utils/RequestUtils.js')

const monday = dateUtils.getDayOfTheCurrentWeek(1)
const friday = dateUtils.getDayOfTheCurrentWeek(5)

const getMeteorsData = async () => {
    const meteorsDataResponse = await requestUtils.getMeteorsWithinPeriodRequest(monday, friday)
    const nearEarthObjects = meteorsDataResponse.data["near_earth_objects"]

    return JSON.stringify(buildMeteorsDataResponse(nearEarthObjects))
}

const buildMeteorsDataResponse = (nearEarthObjects) => {
    const meteorStatistics = []
    Object.keys(nearEarthObjects).forEach((date) => {
        const meteorPerDate = {
            date: date,
            meteors_amount: nearEarthObjects[date].length
        }
        meteorStatistics.push(meteorPerDate)
    })

    return meteorStatistics
}

module.exports = { getMeteorsData }