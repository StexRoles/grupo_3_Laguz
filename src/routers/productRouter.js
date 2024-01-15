// REQUERIR EXPRESS Y USAR ROUTER
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// REQUERIR productController PARA USAR SUS METODOS
const productController = require('../controllers/productController.js');

// CONFIGURACION DE MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/productos');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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

//RUTA PARA CREAR NUEVO PRODUCTO
router.get('/allProducts/newProduct', productController.newProduct);
router.post('/allProducts/newProduct', upload.single("image") ,productController.processCreate);

// RUTA PARA EDITAR EL PRODUCTO 
router.get('/editProduct/:id', productController.editProduct);
router.put('/editProduct/:id', upload.single("image"), productController.processEdit);

// RUTA PARA ELIMINAR EL PRODUCTO
router.delete('/delete/:id', productController.destroy);

//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;