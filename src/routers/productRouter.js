// REQUERIR EXPRESS Y USAR ROUTER
const express = require('express');
const router = express.Router();

// REQUERIR productController PARA USAR SUS METODOS
const productController = require('../controllers/productController.js');

//---------------------------------------------------------------//

//RUTA PARA EL DETALLE DE PRODUCTO
router.get('/products/productDetail/:id?', productController.productDetail);

// RUTA PARA EL CARRITO DE COMPRAS
router.get('/products/productCart', productController.productCart);

// RUTA PARA LA LISTA DE PRODUCTOS DESTACADOS, EN OFERTA Y FAVORITOS
router.get('/products/productsList/:status', productController.productsList);

// RUTA PARA LA LISTA DE DE PRODUCTOS POR CATEGORIAS
router.get('/products/productsCategories/:category', productController.productsCategories);


//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;