import { ValidationException } from '../../exceptions/ValidationException'
import { validateIsLessThanMaxValue } from '../../validators/CountValidator'

const ERROR_MESSAGE = 'Parameter "count" should be positive integer number and less than 100'
const error = new ValidationException(400, ERROR_MESSAGE)

describe('validateIsLessThanMaxValue function', () => {
    it('input param is valid', async () => {
        await expect(() => validateIsLessThanMaxValue('20')).not.toThrow()
    })

    it('input param is max valid', async () => {
        await expect(() => validateIsLessThanMaxValue('100')).not.toThrow()
    })

    it('input param is min valid', async () => {
        await expect(() => validateIsLessThanMaxValue('1')).not.toThrow()
    })

    it('input param is underfined', async () => {
        await expect(() => validateIsLessThanMaxValue(undefined)).not.toThrow()
    })

    it('input param is negative', async () => {
        await expect(() => validateIsLessThanMaxValue('-1')).toThrow(error)
    })

    it('input param is les than min', async () => {
        await expect(() => validateIsLessThanMaxValue('0')).toThrow(error)
    })

    it('input param is blank', async () => {
        await expect(() => validateIsLessThanMaxValue('    ')).toThrow(error)
    })

    it('input param is not number', async () => {
        await expect(() => validateIsLessThanMaxValue('qwertyu')).toThrow(error)
    })

    it('input param is more then max number', async () => {
        await expect(() => validateIsLessThanMaxValue('101')).toThrow(error)
    })
})