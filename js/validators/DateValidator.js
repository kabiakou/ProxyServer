const { compareAsc, isMatch } = require("date-fns")
const ValidationException = require('../exceptions/ValidationException')

const DATE_FORMAT = 'yyyy-MM-dd'

const validateStartDate = (startDate) => {
    if (startDate !== undefined && !isMatch(startDate, DATE_FORMAT)) {
        throw new ValidationException(400, 'Parameter "startDate" should have format yyyy-MM-dd. Ex: 2024-03-04')
    }
}

const validateEndDate = (endDate) => {
    if (endDate !== undefined && !isMatch(endDate, DATE_FORMAT)) {
        throw new ValidationException(400, 'Parameter "endDate" should have format yyyy-MM-dd. Ex: 2024-03-04')
    }
}

const validateStartDateIsNotLargerThanEndDate = (startDate, endDate) => {
    if (endDate !== undefined && startDate !== undefined && compareAsc(endDate, startDate) == -1) {
        throw new ValidationException(400, 'Parameter "endDate" should be larger or equal than parameter "startDate"')
    }
}

module.exports = { validateEndDate, validateStartDate, validateStartDateIsNotLargerThanEndDate }