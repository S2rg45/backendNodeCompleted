'use strict'

const express = require('express')
const { config } = require('./config/index')
const userRecords = require('./services/registerUser/routes/api/api')

// app
const app = express()

// middleware
app.use(express.json())

// apirouter
app.use('/api/market', userRecords)

// redirect
app.get('/', (req, res) => {
  res.redirect('/api/market')
})

app.set('port', config.port || 3000)
app.listen(app.get('port'), () => {
  console.log('Api escuchando en el puerto ', app.get('port'))
})
