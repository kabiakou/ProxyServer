const express = require('express')
const router = express.Router()
const meteorService = require('../services/MeteorService')

router.get('/', async (req, res, next) => {
    try {
        res.json(await meteorService.getMeteorsData())
    } catch (error) {
        next(error)
    }
})

module.exports = router