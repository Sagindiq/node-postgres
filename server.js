require('dotenv').config()
const express = require('express')
const router = require('./src/modules')
const app = express()
const PORT = process.env.PORT || 9000

app.use(express.json())
app.use(router)


app.listen(PORT, console.log(PORT))