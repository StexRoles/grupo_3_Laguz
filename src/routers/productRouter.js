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

// RUTA PARA LA LISTA DE PRODUCTOS DESTACADOS, EN OFERTA Y FAVORITOS
router.get('/productsList/:status', productController.productsList);

// RUTA PARA LA LISTA DE DE PRODUCTOS POR CATEGORIAS
router.get('/productsCategories/:category', productController.productsCategories);

//RUTA PARA CARGAR PRODUCTO
router.get('/newProduct', productController.newProduct);
router.post('/newProduct', productController.processCreate);

// RUTA PARA EDITAR EL PRODUCTO 
router.get('/editProduct/:id', productController.editProduct);



//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;