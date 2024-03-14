const express = require('express')
const router = express.Router()
const { validate } = require('../validators/MeteorValidationFacade')
const { getMeteors } = require('../controllers/MeteorController')

router.get('/', validate, getMeteors)

module.exports = router