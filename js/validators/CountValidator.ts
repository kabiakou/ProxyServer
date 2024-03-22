import { ValidationException } from '../exceptions/ValidationException'

export const validateIsLessThanMaxValue = (count: string | undefined) => {
    // добавить проверку
    const number = Number(count)
    const maxValue = 100
    if (count === undefined || (Math.sign(number) === 1 && number < maxValue)) {
        return
    }
    throw new ValidationException(400, 'Parameter "count" should be positive number and less than 100')
}