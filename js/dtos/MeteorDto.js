class MeteorDto {
  constructor(data) {
    this.startDate = specifyStartDate(data)
    this.endDate = specifyEndDate(data)
    this.count = data.count
    this.wereDangerous = data.were_dangerous
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

module.exports = MeteorDto