import { getMeteorsWithinPeriod } from '../clients/MeteorClient'
import { MeteorDto } from '../dtos/MeteorDto'
import { MeteorPerDateDto } from '../dtos/MeteorPerDateDto'
import { buildMeteorEntity } from '../mappers/MeteorMapper'
import { MeteorEntity, MeteorsDataItem, NearEarthObjects, MeteorPerDateResponse } from '../models/MeteorModels'

export const getMeteorsData = async (meteor: MeteorDto) => {
    const { data } = await getMeteorsWithinPeriod(meteor.startDate, meteor.endDate)
    const nearEarthObjects = data.near_earth_objects

    return buildMeteorsDataResponse(nearEarthObjects, meteor)
}

const buildMeteorsDataResponse = (nearEarthObjects: NearEarthObjects, meteorDto: MeteorDto) => {
    // if (nearEarthObjects === undefined) {
    //     return { data: {} }
    // }

    let wereDangerous: boolean = false
    const meteorsPerDateDto: MeteorPerDateDto[] = []
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
        meteorsPerDateDto.push(new MeteorPerDateDto(date, meteors))
    })

    const response: MeteorPerDateResponse = {
        meteors: meteorsPerDateDto
    }

    if (meteorDto.wereDangerous) {
        response.were_dangerous = wereDangerous
    }

    return response
}