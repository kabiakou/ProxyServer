const express = require('express')
const router = express.Router()
const meteorService = require('../services/MeteorService.js')


router.get('/', async (req, res) => {
    res.send(await meteorService.getMeteorsData())
})


module.exports = router

