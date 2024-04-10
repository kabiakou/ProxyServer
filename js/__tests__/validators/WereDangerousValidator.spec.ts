import { ValidationException } from '../../exceptions/ValidationException'
import { validateWereDangerous } from '../../validators/WereDangerousValidator'

const ERROR_MESSAGE = 'Parameter "were_dangerous" should have only "true" value'
const error = new ValidationException(400, ERROR_MESSAGE)

describe('validateWereDangerous function', () => {
    it('input param is true', async () => {
        await expect(() => validateWereDangerous('true')).not.toThrow()
    })

    it('input param is false', async () => {
        await expect(() => validateWereDangerous('false')).toThrow(error)
    })

    it('input param is undefined', async () => {
        await expect(() => validateWereDangerous(undefined)).not.toThrow()
    })

    it('input param is not boolean', async () => {
        await expect(() => validateWereDangerous('qwertyui')).toThrow(error)
    })

    it('input param is blank', async () => {
        await expect(() => validateWereDangerous('   ')).toThrow(error)
    })
})