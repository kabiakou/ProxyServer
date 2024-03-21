export class UserDto {
    constructor(data) {
        this.userId = data.user_id
        this.userName = data.user_name
        this.apiKey = data.api_key
    }
}