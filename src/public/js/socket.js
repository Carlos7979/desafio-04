// console.log('Client Socket on-line')
const socket = io()

socket.on('event-for-one-socket', data => {
	console.log(data.message);
})

socket.on('event-for-all-sockets-except-for-emitter', data => {
	console.log(data.message);
})

socket.on('event-for-all-sockets', data => {
	console.log(data.message);
})

// const button = document.getElementById('button-emit-for-all')
const emitForAll = () => {
	socket.emit('event-for-all-sockets', {
		message: 'Mensaje para todos, incluyéndome'
	})
}

const emitForAllExceptMe = () => {
	socket.emit('event-for-all-sockets-except-for-emitter', {
		message: 'Mensaje para los demás'
	})
}