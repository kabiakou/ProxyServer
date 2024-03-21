const express = require('express')
const { validate } = require('../validators/MeteorValidationFacade')
const { getMeteors } = require('../controllers/MeteorController')

const router = express.Router()
router.get('/', validate, getMeteors)

module.exports = router