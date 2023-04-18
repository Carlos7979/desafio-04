const { Router } = require('express');
const { Product } = require('../data');
const router = Router();

router.get('/', async (req, res) => {
	const products = await Product.getProducts()
	try {
		
		res.render('index', { products })
	} catch (error) {
		console.log(error);
	}
})

router.get('/realtimeproducts', async (req, res) => {
	const products = await Product.getProducts()
	try {
		
		res.render('realTimeProducts', { products })
	} catch (error) {
		console.log(error);
	}
})

module.exports = router;