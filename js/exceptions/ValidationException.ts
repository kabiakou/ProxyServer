import { BaseException } from './BaseException'

export class ValidationException extends BaseException {
    constructor(code: number, message: string) {
        super(code, message)
        this.code = code
        this.message = message
    }
}