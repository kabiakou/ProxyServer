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

module.exports = { getRecentPhoto }