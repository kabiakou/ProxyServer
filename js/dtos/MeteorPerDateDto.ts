export class MeteorPerDateDto {
    date?: string
    meteors?: Array<any>
    constructor(date: string, meteors: Array<any>) {
        this.date = date
        this.meteors = meteors
    }
}