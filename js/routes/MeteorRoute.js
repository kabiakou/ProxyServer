const express = require('express')
const router = express.Router()
const meteorService = require('../services/MeteorService')

router.get('/', async (req, res) => {
    try {
        res.json(await meteorService.getMeteorsData())
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router