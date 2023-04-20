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
app.use('/static', express.static(__dirname + '/public'))

// routes
app.use('/', routes)

// errors
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
})

module.exports = app
