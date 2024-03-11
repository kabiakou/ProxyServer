const dateUtils = require('../utils/DateUtils')
const requestUtils = require('../clients/MeteorClient')
const meteorMapper = require('../mappers/MeteorMapper')

const monday = dateUtils.getDayOfTheCurrentWeek(1)
const friday = dateUtils.getDayOfTheCurrentWeek(5)

const getMeteorsData = async () => {
    const meteorsDataResponse = await requestUtils.getMeteorsWithinPeriod(monday, friday)
    const nearEarthObjects = meteorsDataResponse.data.near_earth_objects

    return buildMeteorsDataResponse(nearEarthObjects)
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