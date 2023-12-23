// REQUERIR PATH
const path = require('path');

// REQUERIR FS
const fs = require('fs');
const { log } = require('console');

// TRAE TODOS LOS PRODUCTOS DEL JSON Y LOS GUARDA EN UNA VARIABLE
const productsFilePath = path.join(__dirname, '../model/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
        res.render('products/productDetail', {singleProduct});
    },
    productCart: (req, res) => {

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // FILTRAMOS EL PRODUCTO QUE LA PROPIEDAD ADD-CART SEA TRUE
        let cartProducts = products.filter(product => product.addToCart == "true");

        // AQUI REALIZAMOS LA CUENTA DEL PRECIO TOTAL DE LOS PRODUCTOS
        let precioTotal = 0;
        for (let i = 0; i < cartProducts.length; i++) {
            precioTotal += parseInt(cartProducts[i].price);
        }

        // RENDERIZAMOS LA VISTA PRODUCTCART.EJS
        res.render('products/productCart', {cartProducts, precioTotal});
    },
    productsList: (req, res) => {

        // TRAEMOS EL ESTADO DE LOS PRODUCTOS
        let status = req.params.status;

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // SEPARAR LOS PRODUCTOS DESTACADOS
        const filteredProducts = products.filter((product) => product.status == status);

        // VARIABLE PARA EL TITULO
        let listTitle;
        
        // CONDICIONAL PARA CAMBIAR EL TITULO DE LA PAGINA
        if (status == "featured") { listTitle = "Productos Destacados"; }
        else if (status == "in-sale"){ listTitle = "Ofertas Destacadas"; }

        // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
        res.render('products/productsList', {filteredProducts, listTitle});
    },
    productsCategories: (req, res) => {
        
        // TRAEMOS LA CATEGORIA DE LOS PRODUCTOS
        let category = req.params.category;

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // PARSEA TODAS LAS PROPIEDADES CATEGORIES PARA PODER TRABAJAR CON EL ARRAY
        products.forEach(product => {
            product.categories = JSON.parse(product.categories);
        });

        // REVISAR SI LOS PRODUCTOS TIENEN LA CATEGORIA QUE SE REQUIERE
        const filteredProducts = products.filter((product) => {
            return product.categories.includes(category);
        });

        // CONVIERTE LA PRIMERA LETRA EN MAYUSCULA DEL TITULO DE LA CATEGORIA
        category = category.charAt(0).toUpperCase() + category.slice(1);

        // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
        res.render('products/productsCategories', {filteredProducts, category});
    }, 
    editProduct: (req, res) => {
        // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
        res.render('products/editProduct');
    },

    newProduct: (req, res) => {
        // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
        res.render('products/newProduct');
    },

    processCreate: (req, res) => {
        console.log(req.body);
    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = productController;