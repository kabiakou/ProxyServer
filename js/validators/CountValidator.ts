import { ValidationException } from '../exceptions/ValidationException'

export const validateIsLessThanMaxValue = (count) => {
    const maxValue = 100
    if (count === undefined || (Math.sign(count) === 1 && count < maxValue)) {
        return
    }
    throw new ValidationException(400, 'Parameter "count" should be positive number and less than 100')
}