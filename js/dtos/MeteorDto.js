const { subWeeks, addWeeks } = require('date-fns')

class MeteorDto {
    constructor(data) {
        this.startDate = specifyStartDate(data)
        this.endDate = specifyEndDate(data)
        this.count = data.count
        this.wereDangerous = specifyWereDangerous(data)
    }
}

const specifyStartDate = (data) => {
    const defaultPeriod = 1
    const startDate = data.start_date
    const endDate = data.end_date
    if (startDate === undefined && endDate === undefined) {
        return new Date()
    }
    if (startDate === undefined && endDate !== undefined) {
        return subWeeks(endDate, defaultPeriod)
    }
    return new Date(startDate)
}

const specifyEndDate = (data) => {
    const defaultPeriod = 1
    const startDate = data.start_date
    const endDate = data.end_date
    if (startDate === undefined && endDate === undefined) {
        return new Date()
    }
    if (endDate === undefined && startDate !== undefined) {
        return addWeeks(startDate, defaultPeriod)
    }
    return new Date(endDate)
}

const specifyWereDangerous = (data) => data.were_dangerous === 'true'

module.exports = MeteorDto