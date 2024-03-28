import { getRecentPhoto as getRecPhoto } from '../services/RoverService'
import { UserDto } from '../dtos/UserDto'
import { NextFunction, Request, Response } from 'express'
import { UserQueryRequest } from '../models/RoverModels'

export const getRecentPhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDto = new UserDto(req.body)
        const photoLink = await getRecPhoto(userDto)
        res.redirect(photoLink)
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
        const request: UserQueryRequest = req.body
        const userDto = new UserDto(request)
        const photoLink = await getRecPhoto(userDto)
        res.render('recent-photo', {
            recentPhotoLink: photoLink,
            userId: request.user_id,
            userName: request.user_name
        })
    } catch (error) {
        next(error)
    }
}