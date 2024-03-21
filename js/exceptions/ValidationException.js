class ValidationException extends Error {
    constructor(code, message) {
        super()
        this.code = code
        this.message = message
    }
}

module.exports = ValidationException