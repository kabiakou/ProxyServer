import { getRecentPhoto as getRecPhoto } from '../services/RoverService'
import { UserDto } from '../dtos/UserDto'

export const getRecentPhoto = async (req, res, next) => {
    try {
        const userDto = new UserDto(req.body)
        const photoLink = await getRecPhoto(userDto)
        res.redirect(photoLink)
    } catch (error) {
        next(error)
    }
}

export const getRoverForm = async (req, res, next) => {
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

export const getRecentPhotoRoverForm = async (req, res, next) => {
    try {
        const request = req.body
        const userDto = new UserDto(request)
        const photoLink = await roverService.getRecentPhoto(userDto)
        res.render('recent-photo', {
            recentPhotoLink: photoLink,
            userId: request.user_id,
            userName: request.user_name
        })
    } catch (error) {
        next(error)
    }
}