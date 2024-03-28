import { UserQueryRequest } from '../models/RoverModels'

export class UserDto {
    userId?: string
    userName?: string
    apiKey?: string
    constructor(data: UserQueryRequest) {
        this.userId = data.user_id
        this.userName = data.user_name
        this.apiKey = data.api_key
    }
}