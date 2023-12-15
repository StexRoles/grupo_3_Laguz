// REQUERIR EXPRESS Y USAR ROUTER
const express = require('express');
const router = express.Router();

// REQUERIR productController PARA USAR SUS METODOS
const productController = require('../controllers/productController.js');

//---------------------------------------------------------------//

//RUTA PARA EL DETALLE DE PRODUCTO
router.get('/productDetail/:id?', productController.productDetail);

// RUTA PARA EL CARRITO DE COMPRAS
router.get('/productCart', productController.productCart);


//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;