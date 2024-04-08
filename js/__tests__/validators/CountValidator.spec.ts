import { validateIsLessThanMaxValue } from '../../validators/CountValidator'

describe('validateIsLessThanMaxValue function', () => {
    it('input param is valid', async () => {
        await expect(() => validateIsLessThanMaxValue('20')).not.toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is max valid', async () => {
        await expect(() => validateIsLessThanMaxValue('100')).not.toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is min valid', async () => {
        await expect(() => validateIsLessThanMaxValue('1')).not.toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is underfined', async () => {
        await expect(() => validateIsLessThanMaxValue(undefined)).not.toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is negative', async () => {
        await expect(() => validateIsLessThanMaxValue('-1')).toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is les than min', async () => {
        await expect(() => validateIsLessThanMaxValue('0')).toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is blank', async () => {
        await expect(() => validateIsLessThanMaxValue('    ')).toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is not number', async () => {
        await expect(() => validateIsLessThanMaxValue('qwertyu')).toThrow()
    })
})

describe('validateIsLessThanMaxValue function', () => {
    it('input param is more then max number', async () => {
        await expect(() => validateIsLessThanMaxValue('101')).toThrow()
    })
})