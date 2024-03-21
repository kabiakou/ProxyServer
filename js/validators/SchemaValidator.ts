export const validate = (schema, property) => (req, res, next) => {
    const { error } = schema.validate(req[property])
    if (error) {
        const { details } = error
        const message = details.map(i => i.message).join(',')
        res.status(400).json({
            message: message
        })
    }
    next()
}