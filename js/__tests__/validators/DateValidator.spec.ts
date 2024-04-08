import { ValidationException } from '../../exceptions/ValidationException'
import { validateEndDate, validateStartDate, validateStartDateIsNotLargerThanEndDate } from '../../validators/DateValidator'

const COMPARISON_ERROR_MESSAGE = 'Parameter "end_date" should be larger or equal than parameter "start_date"'
const START_DATE_ERROR_MESSAGE = 'Parameter "start_date" should have format yyyy-MM-dd. Ex: 2024-03-04'
const END_DATE_ERROR_MESSAGE = 'Parameter "end_date" should have format yyyy-MM-dd. Ex: 2024-03-04'

const comparisonError = new ValidationException(400, COMPARISON_ERROR_MESSAGE)
const startDateError = new ValidationException(400, START_DATE_ERROR_MESSAGE)
const endDAteError = new ValidationException(400, END_DATE_ERROR_MESSAGE)

describe('validateStartDate function', () => {
    it('input param is valid', async () => {
        await expect(() => validateStartDate('2024-03-04')).not.toThrow()
    })
})

describe('validateStartDate function', () => {
    it('input param is incorrect', async () => {
        await expect(() => validateStartDate('qwe')).toThrow(startDateError)
    })
})

describe('validateStartDate function', () => {
    it('input param is undefined', async () => {
        await expect(() => validateStartDate(undefined)).not.toThrow()
    })
})

describe('validateEndDate function', () => {
    it('input param is valid', async () => {
        await expect(() => validateEndDate('2024-03-04')).not.toThrow()
    })
})

describe('validateEndDate function', () => {
    it('input param is incorrect', async () => {
        await expect(() => validateEndDate('qwe')).toThrow(endDAteError)
    })
})

describe('validateEndDate function', () => {
    it('input param is undefined', async () => {
        await expect(() => validateEndDate(undefined)).not.toThrow()
    })
})

describe('validateStartDateIsNotLargerThanEndDate function', () => {
    it('input params is correct', async () => {
        await expect(() => validateStartDateIsNotLargerThanEndDate('2024-03-04', '2024-03-05')).not.toThrow()
    })
})

describe('validateStartDateIsNotLargerThanEndDate function', () => {
    it('startDate is undefined', async () => {
        await expect(() => validateStartDateIsNotLargerThanEndDate(undefined, '2024-03-05')).not.toThrow()
    })
})

describe('validateStartDateIsNotLargerThanEndDate function', () => {
    it('endDAte is undefined', async () => {
        await expect(() => validateStartDateIsNotLargerThanEndDate('2024-03-05', undefined)).not.toThrow()
    })
})

describe('validateStartDateIsNotLargerThanEndDate function', () => {
    it('all input params are undefined', async () => {
        await expect(() => validateStartDateIsNotLargerThanEndDate(undefined, undefined)).not.toThrow()
    })
})


describe('validateStartDateIsNotLargerThanEndDate function', () => {
    it('startDate is larger tham end Date', async () => {
        await expect(() => validateStartDateIsNotLargerThanEndDate('2024-03-07', '2024-03-05')).toThrow(comparisonError)
    })
})