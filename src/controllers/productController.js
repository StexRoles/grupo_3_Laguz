// REQUERIR PATH
const path = require('path');

// REQUERIR FS
const fs = require('fs');

// TRAE TODOS LOS PRODUCTOS DEL JSON Y LOS GUARDA EN UNA VARIABLE
const productsFilePath = path.join(__dirname, '../model/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productCartFilePath = path.join(__dirname, '../model/productCart.json');
const productCart = JSON.parse(fs.readFileSync(productCartFilePath, 'utf-8'));

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const productController = {
    productDetail: (req, res) => {

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // TRAEMOS EL ID DE LOS PRODUCTOS
        let id = req.params.id;

        // BUSCAMOS EL PRODUCTO QUE COINCIDA CON EL ID
        let singleProduct = products.find(product => product.id == id);

        // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
        res.render('productDetail', {singleProduct});
    },
    productCart: (req, res) => {

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const productCart = JSON.parse(fs.readFileSync(productCartFilePath, 'utf-8'));

        // AQUI REALIZAMOS LA CUENTA DEL PRECIO TOTAL DE LOS PRODUCTOS
        let precioTotal = 0;
        for (let i = 0; i < productCart.length; i++) {
            precioTotal += parseInt(productCart[i].price);
        }

        // RENDERIZAMOS LA VISTA PRODUCTCART.EJS
        res.render('productCart', {productCart, precioTotal});
    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = productController;