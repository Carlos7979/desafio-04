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

socket.on('products', data => {
	const products = data.payload
	const cardContainer = document.getElementById('card-container')
	products.forEach(product => {
		const div = document.createElement('div')
		const ul = document.createElement('ul')
		const liId = document.createElement('li')
		const liTitle = document.createElement('li')
		const liDescription = document.createElement('li')
		const liPrice = document.createElement('li')
		const liThumbnail = document.createElement('li')
		const liCode = document.createElement('li')
		const liStock = document.createElement('li')
		const liDelete = document.createElement('li')
		liId.innerHTML = `Id: ${product.id}`
		liTitle.innerHTML = `Título: ${product.title}`
		liDescription.innerHTML = `Descripción: ${product.description}`
		liPrice.innerHTML = `Precio: ${product.price}`
		liThumbnail.innerHTML = `<img class="card-img" src="${product.thumbnail}" alt="">`
		liCode.innerHTML = `Código: ${product.code}`
		liStock.innerHTML = `Stock: ${product.stock}`
		liDelete.innerHTML = 'Borrar'
		liDescription.setAttribute('class', 'card-description')
		liDelete.setAttribute('class', 'delete-card')
		liDelete.addEventListener('click', e => {
			const id = product.id
			socket.emit('delete-card', id)
		})
		const array = [liId, liTitle, liDescription, liPrice, liThumbnail, liThumbnail, liCode, liStock, liDelete]
		array.forEach(element => {
			ul.appendChild(element)
		})
		div.appendChild(ul)
		div.setAttribute('class', 'card real-time-products')
		div.setAttribute('id', `card-${product.id}`)
		cardContainer.appendChild(div)
	});
})

socket.on('card-deleted', data => {
	const div = document.getElementById(`card-${data.payload}`)
	div.remove()
})

const form = document.getElementById('add-product')
form.addEventListener('submit', e => {
	e.preventDefault()
	const { title, description, price, thumbnail, code, stock} = e.target
	socket.emit('add-product', {
		title: title.value,
		description: description.value,
		price: price.value,
		thumbnail: thumbnail.value,
		code: code.value,
		stock: stock.value
	})
	form.reset()
})

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