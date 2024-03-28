import { MeteorEntity } from '../models/MeteorModels'

export class MeteorPerDateDto {
    date?: string
    meteors?: MeteorEntity[]
    constructor(date: string, meteors: MeteorEntity[]) {
        this.date = date
        this.meteors = meteors
    }
}