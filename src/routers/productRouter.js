// REQUERIR EXPRESS Y USAR ROUTER
const express = require('express');
const router = express.Router();

// MIDLEWARES DE RUTAS
const upload = require('../middlewares/multerMiddleware.js'); // MULTER
const manageProductsMiddleware = require('../middlewares/manageProductsMiddleware.js'); // EVITA ENTRAR A ADMINISTAR PRODUCTOS SI NO ERES ADMINISTRADOR
const authMiddleware = require('../middlewares/authMiddleware.js'); // EVITA ENTRAR A FAVORITES NI PRODUCTCART SI NO ESTAS LOGEADO
const validateProductMiddleware = require('../middlewares/validateProductMiddleware.js'); // VALIDA LOS CAMPOS DEL FORMULARIO DE PRODUCTOS

// REQUERIR productController PARA USAR SUS METODOS
const productController = require('../controllers/productController.js');

//---------------------------------------------------------------//

//RUTA PARA EL DETALLE DE PRODUCTO
router.get('/productDetail/:id?', productController.productDetail);

// RUTA PARA EL CARRITO DE COMPRAS
router.get('/productCart', authMiddleware, productController.productCart);

// RUTA PARA LA LISTA DE PRODUCTOS DESTACADOS, EN OFERTA Y FAVORITOS
router.get('/productsList/:status', productController.productsList);

// RUTA PARA LA LISTA DE PRODUCTOS FILTRADOS POR CATEGORIAS
router.get('/productsCategories/:category', productController.productsCategories);

// RUTA PARA MOSTRAR TODOS LO PRODUCTOS AL ADMINISTRADOR
router.get('/allProducts', manageProductsMiddleware, productController.allProducts);

//RUTA PARA EL DETALLE DE PRODUCTO DE ADMINISTRADOR
router.get('/allProducts/productDetail/:id?', manageProductsMiddleware, productController.productDetail);

//RUTA PARA CREAR NUEVO PRODUCTO
router.get('/allProducts/newProduct', manageProductsMiddleware, productController.newProduct);
router.post('/allProducts/newProduct', upload.single("image"), validateProductMiddleware, manageProductsMiddleware ,productController.processCreate);

// RUTA PARA EDITAR EL PRODUCTO 
router.get('/allProducts/editProduct/:id', manageProductsMiddleware, productController.editProduct);
router.put('/allProducts/editProduct/:id', upload.single("image"), manageProductsMiddleware, productController.processEdit);

// RUTA PARA ELIMINAR EL PRODUCTO
router.delete('/allProducts/delete/:id', productController.destroy);

//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;