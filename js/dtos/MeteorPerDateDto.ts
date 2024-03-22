export class MeteorPerDateDto {
    date?: String
    meteors?: Array<any> // вопросики
    constructor(date: String, meteors: Array<any>) {
        this.date = date
        this.meteors = meteors
    }
}