const express = require('express')
const router = express.Router()
const meteorService = require('../services/MeteorService')
const MeteorDto = require('../dtos/MeteorDto')
const { validate } = require('../validators/MeteorValidationFacade')

router.get('/', validate, async (req, res, next) => {
    try {
        const requestParameters = req.query
        const meteorDto = new MeteorDto(requestParameters)
        res.json(await meteorService.getMeteorsData(meteorDto))
    } catch (error) {
        next(error)
    }
})

module.exports = router