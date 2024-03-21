import * as express from 'express'
import { schemas } from '../validators/schemas/ValidationSchema'

export const roverRouter = express.Router()
const { getRecentPhoto, getRoverForm, getRecentPhotoRoverForm } = require('../controllers/RoverController')
const { validate } = require('../validators/SchemaValidator')

roverRouter
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