const express = require('express')
const meteorRoute = require('./routes/MeteorRoute.js')

const app = express()
const PORT = process.env.PORT

app.use('/meteors', meteorRoute)

app.use((req, res) => {
    res
        .status(404)
        .send("Resourse not found. Try another one.")
})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})