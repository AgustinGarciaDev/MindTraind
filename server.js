const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
require('dotenv').config()
require('./config/database')

require('./config/passport')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'
app.listen(port, host, 4000, () => console.log("app listening on port 4000"))