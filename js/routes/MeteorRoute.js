const express = require('express')
const router = express.Router()
const meteorService = require('../services/MeteorService')
const MeteorDto = require('../dtos/MeteorDto')

const dateValidator = require('../validators/DateValidator')
const countValidator = require('../validators/CountValidator')
const wereDangerousValidator = require('../validators/WereDangerousValidator')

router.get('/', (req, res, next) => {
    const quieryParams = req.query
    const startDateParam = quieryParams.startDate
    const endDateParam = quieryParams.endDate

    dateValidator.validateStartDate(startDateParam)
    dateValidator.validateEndDate(endDateParam)
    dateValidator.validateStartDateIsNotLargerThanEndDate(startDateParam, endDateParam)
    countValidator.validateIsLessThanMaxValue(quieryParams.count)
    wereDangerousValidator.validateWereDangerous(quieryParams.were_dangerous)
    next()
}, async (req, res, next) => {
    try {
        const requestParameters = req.query
        const meteorDto = new MeteorDto(requestParameters)
        res.json(await meteorService.getMeteorsData(meteorDto))
    } catch (error) {
        next(error)
    }
})

module.exports = router