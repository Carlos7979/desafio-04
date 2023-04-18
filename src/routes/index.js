const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.router');
const views = require('./views.router');

// Configurar los routers
router.use('/products', products);
router.use('/', views);

module.exports = router;