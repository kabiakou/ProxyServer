const ValidationException = require('../exceptions/ValidationException')

const validateWereDangerous = (wereDangerous) => {
    if (isNotTrue(wereDangerous)) {
        throw new ValidationException(400, 'Parameter "were_dangerous" should have only "true" value')
    }
}

const isNotTrue = (data) => data !== undefined && data !== 'true'

module.exports = { validateWereDangerous }