const meteorService = require('../services/MeteorService')
const MeteorDto = require('../dtos/MeteorDto')

const getMeteors = async (req, res, next) => {
    try {
        const requestParameters = req.query
        const meteorDto = new MeteorDto(requestParameters)
        const meteorsData = await meteorService.getMeteorsData(meteorDto)
        res.render('index.html', {
            meteorsData: meteorsData.data.meteors,
            wereDangerous: {
                value: meteorsData.data.were_dangerous,
                param: req.query.were_dangerous
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getMeteors }