const dateValidator = require('./DateValidator')
const countValidator = require('./CountValidator')
const wereDangerousValidator = require('./WereDangerousValidator')

const validate = (req, res, next) => {
    const quieryParams = req.query
    const startDateParam = quieryParams.startDate
    const endDateParam = quieryParams.endDate

    dateValidator.validateStartDate(startDateParam)
    dateValidator.validateEndDate(endDateParam)
    dateValidator.validateStartDateIsNotLargerThanEndDate(startDateParam, endDateParam)
    countValidator.validateIsLessThanMaxValue(quieryParams.count)
    wereDangerousValidator.validateWereDangerous(quieryParams.were_dangerous)
    next()
}

module.exports = { validate }