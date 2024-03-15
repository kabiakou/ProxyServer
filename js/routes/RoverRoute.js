const express = require('express')
const router = express.Router()
const { getRecentPhoto } = require('../controllers/RoverController')

router.post('/', getRecentPhoto)

module.exports = router