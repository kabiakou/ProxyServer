const meteorService = require('../services/MeteorService')
const MeteorDto = require('../dtos/MeteorDto')

const getMeteors = async (req, res, next) => {
    try {
        const requestParameters = req.query
        const meteorDto = new MeteorDto(requestParameters)
        res.json(await meteorService.getMeteorsData(meteorDto))
    } catch (error) {
        next(error)
    }
}

module.exports = { getMeteors }