const { compareAsc } = require("date-fns")
const ValidationException = require('../exceptions/ValidationException')

const validateStartDate = (startDate) => {
    try {
        if (startDate === undefined) {
            return
        }
        new Date(startDate).toISOString()
    } catch (error) {
        console.log(error)
        throw new ValidationException(400, 'Parameter "startDate" should have format yyyy-MM-dd. Ex: 2024-03-04')
    }
}

const validateEndDate = (endDate) => {
    try {
        if (endDate === undefined) {
            return
        }
        new Date(endDate).toISOString()
    } catch (error) {
        throw new ValidationException(400, 'Parameter "endDate" should have format yyyy-MM-dd. Ex: 2024-03-04')
    }
}

const validateStartDateIsNotLargerThanEndDate = (startDate, endDate) => {
    if (endDate === undefined || startDate === undefined) {
        console.log("return")
        return
    }
    const startDateTime = new Date(startDate)
    const endDateTime = new Date(endDate)
    if (compareAsc(endDate, startDate) == -1) {
        throw new ValidationException(400, 'Parameter "endDate" should be larger or equal than parameter "startDate"')
    }
}

module.exports = { validateEndDate, validateStartDate, validateStartDateIsNotLargerThanEndDate }