import { getMeteorsData } from '../services/MeteorService'
import { MeteorDto } from '../dtos/MeteorDto'
import { NextFunction, Request, Response } from 'express'

export const getMeteors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req
        const meteorsData = await getMeteorsData(new MeteorDto(query))

        if (Object.keys(meteorsData).length === 0) {
            res.render('empty-meteor-response.html')
            return
        }
        res.render('index.html', {
            meteorsData: meteorsData.meteors,
            wereDangerous: {
                value: meteorsData.were_dangerous,
                param: req.query.were_dangerous
            }
        })
    } catch (error) {
        next(error)
    }
}