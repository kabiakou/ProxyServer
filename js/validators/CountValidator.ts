import { ValidationException } from '../exceptions/ValidationException'

export const validateIsLessThanMaxValue = (count?: string) => {
    const number = Number(count)
    const maxValue = 100
    if (count === undefined || (Number.isInteger(number) && number < maxValue)) {
        return
    }
    throw new ValidationException(400, 'Parameter "count" should be positive integer number and less than 100')
}