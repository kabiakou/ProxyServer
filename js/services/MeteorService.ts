import { getMeteorsWithinPeriod } from '../clients/MeteorClient'
import { MeteorDto } from '../dtos/MeteorDto'
import { MeteorPerDateDto } from '../dtos/MeteorPerDateDto'
import { buildMeteorEntity } from '../mappers/MeteorMapper'

export const getMeteorsData = async (meteor: MeteorDto) => {
    const meteorsDataResponse = await getMeteorsWithinPeriod(meteor.startDate, meteor.endDate)
    const nearEarthObjects = meteorsDataResponse.data.near_earth_objects

    return buildMeteorsDataResponse(nearEarthObjects, meteor)
}

const buildMeteorsDataResponse = (nearEarthObjects: any, meteorDto: MeteorDto) => {
    if (nearEarthObjects === undefined) {
        return { data: {} }
    }

    let wereDangerous = false
    const meteorsDataResponse: Array<MeteorPerDateDto> = []
    Object.keys(nearEarthObjects).forEach((date) => {
        const startCount = 0
        const meteors: Array<any> = []
        nearEarthObjects[date]
            .slice(startCount, meteorDto.count)
            .forEach((meteorStat: any) => {
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