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

// RUTA PARA LA LISTA DE PRODUCTOS FILTRADOS POR CATEGORIAS
router.get('/productsCategories/:category', productController.productsCategories);

// RUTA PARA MOSTRAR TODOS LO PRODUCTOS AL ADMINISTRADOR
router.get('/allProducts', productController.allProducts);

//RUTA PARA EL DETALLE DE PRODUCTO DE ADMINISTRADOR
router.get('/allProducts/productDetail/:id?', productController.productDetail);

//RUTA PARA CARGAR PRODUCTO
router.get('/allProducts/newProduct', productController.newProduct);
router.post('/allProducts/newProduct', productController.processCreate);

// RUTA PARA EDITAR EL PRODUCTO 
router.get('/editProduct/:id', productController.editProduct);

// RUTA PARA ELIMINAR EL PRODUCTO
router.delete('/delete/:id', productController.destroy);

//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;