const express = require('express')
const meteorRoute = require('./routes/MeteorRoute')
const roverRoute = require('./routes/RoverRoute')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/meteors', meteorRoute)
app.use('/rover', roverRoute)

app.use((error, req, res, next) => {
    statusCode = error.code || 500
    res.status(statusCode).json({
        message: error.message
    })
})

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found. Try another one."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})