const express = require('express')
const app = express()
const routes = require('./routes')
const handlebars = require('express-handlebars')

// handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// express
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use('/', routes)

module.exports = app
