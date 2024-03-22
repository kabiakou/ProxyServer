import { getMeteorsData } from '../services/MeteorService'
import { MeteorDto } from '../dtos/MeteorDto'
import { NextFunction, Request, Response } from 'express'
import { MeteorQueryRequest } from '../models/MeteorModels'

export const getMeteors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestParameters = req.query as MeteorQueryRequest
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