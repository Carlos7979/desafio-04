const socketServer = (io) => {
	io.on('connection', socket => {
		console.log('Nuevo cliente conectado → clientId: ' + socket.client.id + ' y socketId: ' + socket.id);
	
		// el primer parámetro lo definimos nosotros
		socket.on('event-for-all-sockets', data => {
			console.log(data.message);
			io.emit('event-for-all-sockets', {
				message: 'Mensaje para todos los clientes → clientId: ' + socket.client.id + ' y socketId: ' + socket.id
			})
	
		})
		socket.on('event-for-all-sockets-except-for-emitter', data => {
			console.log(data.message);
			socket.broadcast.emit('event-for-all-sockets-except-for-emitter', {
				message: 'Evento enviado por un cliente para los demás sockets → clientId: ' + socket.client.id + ' y socketId: ' + socket.id
			})
		})
		socket.emit('event-for-one-socket', {
			message: 'cliente conectado → clientId: ' + socket.client.id + ' y socketId: ' + socket.id
		})
	})
}

module.exports = socketServer
