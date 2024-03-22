import { MeteorQueryRequest } from "../models/MeteorModels"

const { subWeeks, addWeeks } = require('date-fns')

export class MeteorDto {
    startDate?: Date
    endDate?: Date
    count?: number
    wereDangerous: boolean
    constructor(data: MeteorQueryRequest) {
        this.startDate = specifyStartDate(data)
        this.endDate = specifyEndDate(data)
        this.count = Number(data.count)
        this.wereDangerous = specifyWereDangerous(data)
    }
}

const specifyStartDate = (data: MeteorQueryRequest) => {
    const defaultPeriod = 1
    const startDate = data.start_date
    const endDate = data.end_date
    if (startDate === undefined && endDate === undefined) {
        return new Date()
    }
    if (startDate === undefined && endDate !== undefined) {
        return subWeeks(endDate, defaultPeriod)
    }
    return new Date(startDate as string)
}

const specifyEndDate = (data: MeteorQueryRequest) => {
    const defaultPeriod = 1
    const startDate = data.start_date
    const endDate = data.end_date
    if (startDate === undefined && endDate === undefined) {
        return new Date()
    }
    if (endDate === undefined && startDate !== undefined) {
        return addWeeks(startDate, defaultPeriod)
    }
    return new Date(endDate as string)
}

const specifyWereDangerous = (data: MeteorQueryRequest) => data.were_dangerous === 'true'