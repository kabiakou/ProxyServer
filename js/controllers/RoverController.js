const roverService = require('../services/RoverService')
const UserDto = require('../dtos/UserDto')

const getRecentPicture = async (req, res, next) => {
    try {
        const requestBody = req.body
        const userDto = new UserDto(requestBody)
        const photoLink = await roverService.getRecentPhoto(userDto)
        res.redirect(photoLink)
    } catch (error) {
        next(error)
    }
}

module.exports = { getRecentPicture }