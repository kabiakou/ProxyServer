const requestUtils = require('../clients/MeteorClient')
const MeteorPerDateDto = require('../dtos/MeteorPerDateDto')
const meteorMapper = require('../mappers/MeteorMapper')

const getMeteorsData = async (meteor) => {
    const meteorsDataResponse = await requestUtils.getMeteorsWithinPeriod(meteor.startDate, meteor.endDate)
    const nearEarthObjects = meteorsDataResponse.data.near_earth_objects

    return buildMeteorsDataResponse(nearEarthObjects, meteor)
}

const buildMeteorsDataResponse = (nearEarthObjects, meteorDto) => {
    if (nearEarthObjects === undefined) {
        return { data: {} }
    }

    let wereDangerous = false
    const meteorsDataResponse = []
    Object.keys(nearEarthObjects).forEach((date) => {
        const startCount = 0
        const meteors = []
        nearEarthObjects[date]
            .slice(startCount, meteorDto.count)
            .forEach((meteorStat) => {
                meteors.push(meteorMapper.buildMeteorEntity(meteorStat))
                if (meteorDto.wereDangerous !== undefined && wereDangerous !== true) {
                    wereDangerous = meteorStat.is_potentially_hazardous_asteroid
                }
            })
        meteorsDataResponse.push(new MeteorPerDateDto(date, meteors))
    })

    return {
        data: {
            mete: meteorsDataResponse,
            were_dangerous: meteorDto.wereDangerous ? wereDangerous : undefined
        }
    }
}

module.exports = { getMeteorsData }