const productManager = require("../data/productManager");

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
			message: 'cliente conectado',
			clientId: socket.client.id,
			socketId: socket.id
		})
	})
}

const socketProducts =  (io) => {
	io.on('connection', async socket => {
		try {
			const products = await productManager.getProducts()
			socket.emit('products', {
				status: 'success',
				payload: products
			})
			socket.on('add-product', async data => {
				const { title, description, price, thumbnail, code, stock } = data
				const product = await productManager.addProduct(title, description, price, thumbnail, code, stock)
				if (product) {
					io.emit('products', {
						status: 'success',
						payload: [ product ]
					})
				}
			})
			socket.on('delete-card', async data => {
				const product = await productManager.deleteProduct(data)
				if (product !== 'Not found') {
					io.emit('card-deleted', {
						status: 'success',
						payload: data
					})
				}
			})
		} catch (error) {
			console.log(error);
		}
	})
}

module.exports = {
	socketServer,
	socketProducts
}
