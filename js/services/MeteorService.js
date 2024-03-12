const { previousMondayDate, previousFridayDate } = require('../utils/DateUtils')
const requestUtils = require('../clients/MeteorClient')
const meteorMapper = require('../mappers/MeteorMapper')

const getMeteorsData = async (meteorDto) => {
    const a = specifyDates(meteorDto)

    const meteorsDataResponse = await requestUtils
        .getMeteorsWithinPeriod(a.startDate, a.endDate)
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

const specifyDates = (meteorDto) => {
    const startDate = meteorDto.startDate
    const endDate = meteorDto.endDate

    if (startDate === undefined && endDate !== undefined) {
        meteorDto.startDate = endDate
    }

    if (endDate === undefined && startDate !== undefined) {
        meteorDto.endDate = startDate
    }
    return meteorDto
}

module.exports = { getMeteorsData }