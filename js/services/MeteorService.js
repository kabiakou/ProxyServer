const dateUtils = require('../utils/DateUtils.js')
const requestUtils = require('../clients/MeteorClient.js')
const meteorMapper = require('../mappers/MeteorMapper.js')

const NEAR_EARTH_OBJECTS_FIELD = "near_earth_objects"
const monday = dateUtils.getDayOfTheCurrentWeek(1)
const friday = dateUtils.getDayOfTheCurrentWeek(5)

const getMeteorsData = async () => {
    const meteorsDataResponse = await requestUtils.getMeteorsWithinPeriod(monday, friday)
    const nearEarthObjects = meteorsDataResponse.data[NEAR_EARTH_OBJECTS_FIELD]

    return JSON.stringify(buildMeteorsDataResponse(nearEarthObjects))
}

const buildMeteorsDataResponse = (nearEarthObjects) => {
    if (nearEarthObjects === undefined) {
        return { data: {} }
    }

    const meteorsDataResponse = []
    Object.keys(nearEarthObjects).forEach((date) => {

        const meteors = []
        nearEarthObjects[date].forEach((meteorStat) => {
            meteors.push(meteorMapper.buildMeteorEntity(meteorStat))
        })

        const meteorsPerDate = {
            data: {
                date: date,
                meteors: meteors
            }
        }
        meteorsDataResponse.push(meteorsPerDate)
    })

    return meteorsDataResponse
}

module.exports = { getMeteorsData }