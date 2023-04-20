const app = require('./src/app.js')
const { Server } = require('socket.io')
const socketServer = require('./src/utils/socket.js')

const port = 8080
const httpServer = app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

const io = new Server(httpServer)
socketServer(io)
