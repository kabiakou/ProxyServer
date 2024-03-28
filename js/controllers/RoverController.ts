import { getRecentPhoto as getRecPhoto } from '../services/RoverService'
import { UserDto } from '../dtos/UserDto'
import { NextFunction, Request, Response } from 'express'

export const getRecentPhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.redirect(await getRecPhoto(new UserDto(req.body)))
    } catch (error) {
        next(error)
    }
}

export const getRoverForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('rover-form', {
            userIdLabel: 'User Id:',
            userNameLabel: 'User name:',
            userApiKeyLabel: 'User Api key:'
        })
    } catch (error) {
        next(error)
    }
}

export const getRecentPhotoRoverForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        const userDto = new UserDto(body)
        const photoLink = await getRecPhoto(userDto)
        res.render('recent-photo', {
            recentPhotoLink: photoLink,
            userId: body.user_id,
            userName: body.user_name
        })
    } catch (error) {
        next(error)
    }
}