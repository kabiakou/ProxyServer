import { getMeteorsData } from '../services/MeteorService'
import { MeteorDto } from '../dtos/MeteorDto'

export const getMeteors = async (req, res, next) => {
    try {
        const requestParameters = req.query
        const meteorDto = new MeteorDto(requestParameters)
        const meteorsData = await getMeteorsData(meteorDto)
        res.render('index.html', {
            meteorsData: meteorsData.data.meteors,
            wereDangerous: {
                value: meteorsData.data.were_dangerous,
                param: req.query.were_dangerous
            }
        })
    } catch (error) {
        console
        next(error)
    }
}