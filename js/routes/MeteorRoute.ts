import * as express from 'express'
import { validate } from '../validators/MeteorValidationFacade'
import { getMeteors } from '../controllers/MeteorController'

export const meteorRouter = express.Router()
meteorRouter.get('/', validate, getMeteors)