// REQUERIR PATH
const path = require('path');

// REQUERIR FS
const fs = require('fs');

// TRAE TODOS LOS PRODUCTOS DEL JSON Y LOS GUARDA EN UNA VARIABLE
const productsFilePath = path.join(__dirname, '../model/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require('../database/models');

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const mainController = {
    index: (req, res) => {

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // SEPARAR LOS PRODUCTOS EN OFERTAS Y DESTACADOS
        const featuredProducts = products.filter((product) => product.status == "featured");
		const inSaleProducts = products.filter((product) => product.status == "in-sale");

        // RENDERIZAMOS LA VISTA INDEX.EJS
        res.render('main/index', {featuredProducts, inSaleProducts});
    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = mainController;