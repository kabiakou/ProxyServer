const express = require('express')
const meteorRoute = require('./routes/MeteorRoute')

const app = express()
const PORT = process.env.PORT

app.use('/meteors', meteorRoute)

app.use((error, req, res, next) => {
    statusCode = error.code || 500
    res.status(statusCode).json({
        code: statusCode,
        message: error.message
    })
})

app.use((req, res) => {
    res.status(404).json({
        code: 404,
        message: "Page not found. Try another one."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})