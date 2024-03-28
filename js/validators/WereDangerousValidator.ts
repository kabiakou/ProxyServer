import { ValidationException } from '../exceptions/ValidationException'

export const validateWereDangerous = (wereDangerous?: string) => {
    if (isNotTrue(wereDangerous)) {
        throw new ValidationException(400, 'Parameter "were_dangerous" should have only "true" value')
    }
}

const isNotTrue = (data?: string) => data !== undefined && data !== 'true'