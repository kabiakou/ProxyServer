const express = require('express')
const meteorService = require('../service/MeteorService.js')

const PORT = process.env.PORT
const app = express()


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

app.get('/meteors', async (req, res) => {
    res.send(await meteorService.getMeteorsData())
})
