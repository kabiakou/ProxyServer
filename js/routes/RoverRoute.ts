import * as express from 'express'
import { schemas } from '../validators/schemas/ValidationSchema'
import { getRecentPhoto, getRoverForm, getRecentPhotoRoverForm } from '../controllers/RoverController'
import { validate } from '../validators/SchemaValidator'

export const roverRouter = express.Router()

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