class MeteorDto {
  constructor(data) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.count = data.count,
    this.wereDangerous = data.were_dangerous
  }
}

module.exports = MeteorDto