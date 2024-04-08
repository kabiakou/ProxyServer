import { validateWereDangerous } from '../../validators/WereDangerousValidator'

describe('validateWereDangerous function', () => {
    it('input param is true', async () => {
        await expect(() => validateWereDangerous('true')).not.toThrow()
    })
})

describe('validateWereDangerous function', () => {
    it('input param is false', async () => {
        await expect(() => validateWereDangerous('false')).toThrow()
    })
})

describe('validateWereDangerous function', () => {
    it('input param is undefined', async () => {
        await expect(() => validateWereDangerous(undefined)).not.toThrow()
    })
})

describe('validateWereDangerous function', () => {
    it('input param is not boolean', async () => {
        await expect(() => validateWereDangerous('qwertyui')).toThrow()
    })
})

describe('validateWereDangerous function', () => {
    it('input param is blank', async () => {
        await expect(() => validateWereDangerous('   ')).toThrow()
    })
})