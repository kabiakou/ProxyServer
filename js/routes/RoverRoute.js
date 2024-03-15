const express = require('express')
const router = express.Router()
const schemas = require('../validators/schemas/ValidationSchema')
const { getRecentPhoto } = require('../controllers/RoverController')
const { validate } = require('../validators/SchemaValidator')

router
    .post('/', validate(schemas.userDto, 'body'), getRecentPhoto)
    // added additional GET enpoint just within Joi studing 
    .get('/', validate(schemas.userDto, 'request'),
        async (req, res, next) => {
            try {
                res.json(req.query)
            } catch (error) {
                next(error)
            }
        })

module.exports = router