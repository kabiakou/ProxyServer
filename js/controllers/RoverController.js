const roverService = require('../services/RoverService')
const UserDto = require('../dtos/UserDto')

const getRecentPhoto = async (req, res, next) => {
    try {
        const userDto = new UserDto(req.body)
        const photoLink = await roverService.getRecentPhoto(userDto)
        res.redirect(photoLink)
    } catch (error) {
        next(error)
    }
}

const getRoverForm = async (req, res, next) => {
    try {
        res.render('rover-form', {
            userIdLabel: "User Id:",
            userNameLabel: "User name:",
            userApiKeyLabel: "User Api key:",
        })
    } catch (error) {
        next(error)
    }
}

const getRecentPhotoRoverForm = async (req, res, next) => {
    try {
        const request = req.body
        const userDto = new UserDto(request)
        const photoLink = await roverService.getRecentPhoto(userDto)
        res.render('recent-photo', {
            recentPhotoLink: photoLink,
            userId: request.user_id,
            userName: request.user_name,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getRecentPhoto, getRoverForm, getRecentPhotoRoverForm }