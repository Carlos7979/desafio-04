const express = require('express')
const app = express()
const routes = require('./routes')
const handlebars = require('express-handlebars')
const port = 8080
const { Server } = require('socket.io')

const httpServer = app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
  })

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
	console.log('Nuevo cliente conectado → ' + socket.client.id);

	// el primer parámetro lo definimos nosotros
	socket.on('event-for-all-sockets', data => {
		console.log(data.message);
		socketServer.emit('event-for-all-sockets', {
			message: 'Mensaje para todos los clientes'
		})

	})
	socket.on('event-for-all-sockets-except-for-emitter', data => {
		console.log(data.message);
		socket.broadcast.emit('event-for-all-sockets-except-for-emitter', {
			message: 'Evento enviado por un cliente para los demás sockets'
		})

	})
	socket.emit('event-for-one-socket', {
		message: 'cliente conectado'
	})
})

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
