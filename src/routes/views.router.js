const { Router } = require('express');
const { Product } = require('../data');
const router = Router();

router.get('/home', async (req, res) => {
	const products = await Product.getProducts()
	try {
		
		res.render('home', { products })
	} catch (error) {
		console.log(error);
	}
})

router.get('/realtimeproducts', async (req, res) => {
	// const products = await Product.getProducts()
	try {
		
		// res.render('realTimeProducts', { products })
		res.render('realTimeProducts')
	} catch (error) {
		console.log(error);
	}
})

module.exports = router;