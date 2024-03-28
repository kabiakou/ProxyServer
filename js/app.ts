import express, { Request, Response, NextFunction } from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import { meteorRouter } from './routes/MeteorRoute'
import { roverRouter } from './routes/RoverRoute'
import { BaseException } from './exceptions/BaseException'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/meteors', meteorRouter)
app.use('/rover', roverRouter)

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'html')
nunjucks.configure(['views/'], {
    autoescape: false,
    express: app,
    noCache: true
})

app.use((error: BaseException, req: Request, res: Response, next: NextFunction): void => {
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
