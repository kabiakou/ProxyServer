import express, { Request, Response, NextFunction } from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import { meteorRouter } from './routes/MeteorRoute'
import { roverRouter } from './routes/RoverRoute'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import * as Sentry from '@sentry/node'

const app = express()
const PORT = process.env.PORT
const DSN = process.env.SENTRY_DSN

Sentry.init({
    dsn: DSN,
    integrations: []
})
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/meteors', meteorRouter)
app.use('/rover', roverRouter)

// sentry test api
app.get('/debug-sentry', function mainHandler(req: Request, res: Response) {
    throw new Error('My first Sentry error!')
})

app.use((req, res) => {
    res.status(404).json({
        message: 'Page not found. Try another one.'
    })
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

nunjucks.configure(['views/'], {
    autoescape: false,
    express: app,
    noCache: true
})

app.use(Sentry.Handlers.errorHandler())

app.use(function onError(error: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = error.code || 500
    res.status(statusCode).json({
        message: error.message
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})