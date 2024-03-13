const ValidationException = require('../exceptions/ValidationException')

const validateWereDangerous = (wereDangerous) => {
    if (isNotTrue(wereDangerous)) {
        throw new ValidationException(400, 'Parameter "were_dangerous" should have only "true" values')
    }
}

const isNotTrue = (data) => data !== undefined && (data.toLowerCase() !== 'true')

module.exports = { validateWereDangerous }