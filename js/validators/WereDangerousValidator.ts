import { ValidationException } from '../exceptions/ValidationException'

export const validateWereDangerous = (wereDangerous: string  | undefined) => {
    if (isNotTrue(wereDangerous)) {
        throw new ValidationException(400, 'Parameter "were_dangerous" should have only "true" value')
    }
}

const isNotTrue = (data: string  | undefined) => data !== undefined && data !== 'true'