import { validateStartDate, validateEndDate, validateStartDateIsNotLargerThanEndDate } from './DateValidator'
import { validateIsLessThanMaxValue } from './CountValidator'
import { validateWereDangerous } from './WereDangerousValidator'

export const validate = (req, res, next) => {
    const quieryParams = req.query
    const startDateParam = quieryParams.startDate
    const endDateParam = quieryParams.endDate

    validateStartDate(startDateParam)
    validateEndDate(endDateParam)
    validateStartDateIsNotLargerThanEndDate(startDateParam, endDateParam)
    validateIsLessThanMaxValue(quieryParams.count)
    validateWereDangerous(quieryParams.were_dangerous)
    next()
}