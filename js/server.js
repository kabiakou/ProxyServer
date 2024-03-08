const express = require('express')
const moment = require('moment')
const index = require('./index.js')

const PORT = process.env.PORT

const app = express()
const now = moment()
const startDate = now.subtract(5, 'days').format('YYYY-MM-DD')
const endDate = now.format('YYYY-MM-DD')

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

app.get('/meteors', (req, res) => {
    const response = index.getAsteroidsWithinPeriod(startDate, endDate)
    console.log(response)
    res.send(`Amount of asteroids were seen from ${startDate} to ${endDate}: ${response.element_count}`)
})
