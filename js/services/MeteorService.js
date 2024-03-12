const requestUtils = require('../clients/MeteorClient')
const meteorMapper = require('../mappers/MeteorMapper')

const getMeteorsData = async (meteorDto) => {
    const updatedMeteor = specifyDates(meteorDto)
    const meteorsDataResponse = await requestUtils
        .getMeteorsWithinPeriod(updatedMeteor.startDate, updatedMeteor.endDate)
    const nearEarthObjects = meteorsDataResponse.data.near_earth_objects

    return buildMeteorsDataResponse(nearEarthObjects, updatedMeteor)
}

const buildMeteorsDataResponse = (nearEarthObjects, updatedMeteor) => {
    if (nearEarthObjects === undefined) {
        return { data: {} }
    }

    const meteorsDataResponse = []
    Object.keys(nearEarthObjects).forEach((date) => {
        const start = 0
        const meteors = []
        nearEarthObjects[date]
            .slice(start, updatedMeteor.count)
            .forEach((meteorStat) => {
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