import express, { Request, Response, NextFunction } from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import { meteorRouter } from './routes/MeteorRoute'
import { roverRouter } from './routes/RoverRoute'
import { nodeProfilingIntegration } from "@sentry/profiling-node"
import * as Sentry from '@sentry/node'

const app = express()
const PORT = process.env.PORT


Sentry.init({
    dsn: "https://06af601437eca5ff82eb90e1879fe1e1@o4506972824010752.ingest.us.sentry.io/4506973207920640",
    integrations: [],
  });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All your controllers should live here
app.get("/", function rootHandler(req, res) {
    res.end("Hello world!");
  });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.use('/meteors', meteorRouter)
app.use('/rover', roverRouter)

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'html')
nunjucks.configure(['views/'], {
    autoescape: false,
    express: app,
    noCache: true
})

// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = error.code || 500
//     res.status(statusCode).json({
//         message: error.message
//     })
// })

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err: any, req: any, res: any, next: any) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    console.log(res.sentry)
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

app.use((req, res) => {
    res.status(404).json({
        message: 'Page not found. Try another one.'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})