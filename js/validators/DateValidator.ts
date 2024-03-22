import { compareAsc, isMatch } from 'date-fns'
import { ValidationException } from '../exceptions/ValidationException'

const DATE_FORMAT = process.env.DATE_FORMAT!

export const validateStartDate = (startDate: string | undefined) => {
    if (startDate !== undefined && !isMatch(startDate, DATE_FORMAT)) {
        throw new ValidationException(400, 'Parameter "start_date" should have format yyyy-MM-dd. Ex: 2024-03-04')
    }
}

export const validateEndDate = (endDate: string | undefined) => {
    if (endDate !== undefined && !isMatch(endDate, DATE_FORMAT)) {
        throw new ValidationException(400, 'Parameter "end_date" should have format yyyy-MM-dd. Ex: 2024-03-04')
    }
}

export const validateStartDateIsNotLargerThanEndDate = (startDate: string | undefined, endDate: string | undefined) => {
    if (endDate !== undefined && startDate !== undefined && compareAsc(endDate, startDate) === -1) {
        throw new ValidationException(400, 'Parameter "end_date" should be larger or equal than parameter "start_date"')
    }
}