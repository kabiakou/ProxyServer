import { ValidationException } from '../exceptions/ValidationException'

export const validateWereDangerous = (wereDangerous) => {
    if (isNotTrue(wereDangerous)) {
        throw new ValidationException(400, 'Parameter "were_dangerous" should have only "true" value')
    }
}

const isNotTrue = (data) => data !== undefined && data !== 'true'