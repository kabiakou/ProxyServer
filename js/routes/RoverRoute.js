const express = require('express')
const schemas = require('../validators/schemas/ValidationSchema')

const router = express.Router()
const { getRecentPhoto, getRoverForm, getRecentPhotoRoverForm } = require('../controllers/RoverController')
const { validate } = require('../validators/SchemaValidator')

router
    .post('/', validate(schemas.userDto, 'body'), getRecentPhoto)
    // added additional GET enpoint just within Joi studing
    .get('/', validate(schemas.userDto, 'query'),
        async (req, res, next) => {
            try {
                res.json(req.query)
            } catch (error) {
                next(error)
            }
        })
    .get('/form', getRoverForm)
    .post('/form/response', getRecentPhotoRoverForm)

module.exports = router