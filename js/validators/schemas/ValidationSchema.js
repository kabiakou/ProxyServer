const Joi = require('joi')

const schemas = {
    userDto: Joi.object().keys({
        user_id: Joi.string().required().min(1).max(30),
        user_name: Joi.string().required().min(1).max(30),
        api_key: Joi.string().required().min(1).max(40)
    })
}

module.exports = schemas