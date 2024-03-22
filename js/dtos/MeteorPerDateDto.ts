export class MeteorPerDateDto {
    date?: String
    meteors?: Array<any>
    constructor(date: String, meteors: Array<any>) {
        this.date = date;
        this.meteors = meteors
    }
}