const express = require('express')
const productManager = require('./productManager')
const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) => {
	let { limit } = req.query
	limit = Number(limit)
	const products = await productManager.getProducts()
	if (limit && (typeof limit === 'number') && (limit > 0)) {
		return res.send(products.slice(0, limit))
	}
	res.send(products)
});

app.get('/products/:id', async (req, res) => {
	let { id } = req.params
	// id = Number(id)
	const product = await productManager.getProductById(id)
	if (product) {
		return res.send(product)
	}
	res.send({error: `El producto con el id ${id} no existe`})
});


module.exports = app
