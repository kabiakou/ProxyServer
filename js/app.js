const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const meteorRoute = require('./routes/MeteorRoute')
const roverRoute = require('./routes/RoverRoute')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/meteors', meteorRoute)
app.use('/rover', roverRoute)

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'html')
nunjucks.configure(['views/'], {
    autoescape: false,
    express: app,
    noCache: true
})

app.use((error, req, res, next) => {
    const statusCode = error.code || 500
    res.status(statusCode).json({
        message: error.message
    })
})

app.use((req, res) => {
    res.status(404).json({
        message: 'Page not found. Try another one.'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})