const express = require('express')
const router = express.Router()
const { getRecentPicture } = require('../controllers/RoverController')

router.post('/', getRecentPicture)

module.exports = router