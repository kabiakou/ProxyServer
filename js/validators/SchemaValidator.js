const validate = (schema, property) => {
    return (req, res, next) => {
        console.log(req[property])
        const { error } = schema.validate(req[property])
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',')
            res.status(400).json({
                message: message
            })
        }
        next()
    }
}

module.exports = { validate }