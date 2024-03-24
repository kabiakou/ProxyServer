import { getMeteorsWithinPeriod } from '../clients/MeteorClient'
import { MeteorDto } from '../dtos/MeteorDto'
import { MeteorPerDateDto } from '../dtos/MeteorPerDateDto'
import { buildMeteorEntity } from '../mappers/MeteorMapper'
import { MeteorEntity, MeteorsDataItem, NearEarthObjects } from '../models/MeteorModels'

export const getMeteorsData = async (meteor: MeteorDto) => {
    const meteorsDataResponse = await getMeteorsWithinPeriod(meteor.startDate, meteor.endDate)
    const nearEarthObjects = meteorsDataResponse.data.near_earth_objects as NearEarthObjects

    return buildMeteorsDataResponse(nearEarthObjects, meteor)
}

const buildMeteorsDataResponse = (nearEarthObjects: NearEarthObjects, meteorDto: MeteorDto) => {
    if (nearEarthObjects === undefined) {
        return { data: {} }
    }

    let wereDangerous = false
    const meteorsDataResponse: MeteorPerDateDto[] = []
    Object.keys(nearEarthObjects).forEach((date) => {
        const startCount = 0
        const meteors: MeteorEntity[] = []
        nearEarthObjects[date]
            .slice(startCount, meteorDto.count)
            .forEach((meteorStat: MeteorsDataItem) => {
                meteors.push(buildMeteorEntity(meteorStat))
                if (meteorDto.wereDangerous !== undefined && wereDangerous !== true) {
                    wereDangerous = meteorStat.is_potentially_hazardous_asteroid
                }
            })
        meteorsDataResponse.push(new MeteorPerDateDto(date, meteors))
    })

    return {
        data: {
            meteors: meteorsDataResponse,
            were_dangerous: meteorDto.wereDangerous ? wereDangerous : undefined
        }
    }
}