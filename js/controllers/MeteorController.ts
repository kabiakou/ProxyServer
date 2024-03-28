import { getMeteorsData } from '../services/MeteorService'
import { MeteorDto } from '../dtos/MeteorDto'
import { NextFunction, Request, Response } from 'express'
import { MeteorPerDateResponse, MeteorQueryRequest } from '../models/MeteorModels'

export const getMeteors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestParameters = req.query as MeteorQueryRequest
        const meteorDto: MeteorDto = new MeteorDto(requestParameters)
        const meteorsData = await getMeteorsData(meteorDto) as MeteorPerDateResponse
        
        res.render('index.html', {
            meteorsData: meteorsData?.meteors,
            wereDangerous: {
                value: meteorsData?.were_dangerous,
                param: req.query.were_dangerous
            }
        })
    } catch (error) {
        next(error)
    }
}