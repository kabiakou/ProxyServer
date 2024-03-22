import { validateStartDate, validateEndDate, validateStartDateIsNotLargerThanEndDate } from './DateValidator'
import { validateIsLessThanMaxValue } from './CountValidator'
import { validateWereDangerous } from './WereDangerousValidator'
import { NextFunction, Request, Response } from 'express'
import { MeteorQueryRequest } from '../models/MeteorModels'

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const queryParams = req.query as MeteorQueryRequest
    const startDateParam = queryParams.start_date
    const endDateParam = queryParams.end_date

    validateStartDate(startDateParam)
    validateEndDate(endDateParam)
    validateStartDateIsNotLargerThanEndDate(startDateParam, endDateParam)
    validateIsLessThanMaxValue(queryParams.count)
    validateWereDangerous(queryParams.were_dangerous)
    next()
}