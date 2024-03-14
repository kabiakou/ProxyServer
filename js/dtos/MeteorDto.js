class MeteorDto {
  constructor(data) {
    this.startDate = specifyStartDate(data)
    this.endDate = specifyEndDate(data)
    this.count = data.count
    this.wereDangerous = specifyWereDangerous(data)
  }
}

const specifyStartDate = (data) => {
  const startDate = data.startDate
  const endDate = data.endDate
  return startDate === undefined && endDate !== undefined ? endDate : startDate
}

const specifyEndDate = (data) => {
  const startDate = data.startDate
  const endDate = data.endDate
  return endDate === undefined && startDate !== undefined ? startDate : endDate
}

const specifyWereDangerous = (data) => {
  const wereDangerous = data.wereDangerous
  return wereDangerous !== undefined && wereDangerous.toLowerCase() === 'true'
}

module.exports = MeteorDto