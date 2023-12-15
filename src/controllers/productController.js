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
        res.render('productDetail', {singleProduct});
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
        res.render('productCart', {cartProducts, precioTotal});
    },
    productsList: (req, res) => {

        // TRAEMOS EL ESTADO DE LOS PRODUCTOS
        let status = req.params.status;

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // SEPARAR LOS PRODUCTOS DESTACADOS
        const featuredProducts = products.filter((product) => product.status == "featured");

        // SEPARAR LOS PRODUCTOS EN OFERTA
        const inSaleProducts = products.filter((product) => product.status == "in-sale");

        // SEPARAR LOS PRODUCTOS FAVORITOS
        const favoriteProducts = products.filter((product) => product.favorite == "true");

        // CREAMOS UNA VARIABLE PARA GUARDAR LOS PRODUCTOS QUE CORRESPONDAN
        let productsToShow;
        
        // CREAMOS UNA VARIABLE PARA GUARDAR EL TITULO DE LA VISTA
        let listTitle;

        // USAMOS UN CONDICIONAL PARA ENVIAR LOS PRODUCTOS QUE CORRESPONDAN CON EL ESTADO QUE REQUERIMOS
        if (status == "featured") {
            productsToShow = featuredProducts;
            listTitle = "Productos Destacados";
        }
        else if (status == "in-sale") {
            productsToShow = inSaleProducts;
            listTitle = "Ofertas Destacadas";
        }
        else if (status == "favorites") {
            productsToShow = favoriteProducts;
            listTitle = "Tus Favoritos";
        }

        // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
        res.render('productsList', {productsToShow, listTitle});
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
        const laptopsProducts = products.filter((product) => {
            return product.categories.includes("laptops");
        });

        const oficinaProducts = products.filter((product) => {
            return product.categories.includes("oficina");
        });

        const estudiantesProducts = products.filter((product) => {
            return product.categories.includes("estudiantes");
        });

        const accesoriosProducts = products.filter((product) => {
            return product.categories.includes("accesorios");
        });

        const gamerProducts = products.filter((product) => {
            return product.categories.includes("gamer");
        });
        
        // CREAMOS UNA VARIABLE PARA GUARDAR LOS PRODUCTOS QUE CORRESPONDAN
        let productsCategory;
        
        // CREAMOS UNA VARIABLE PARA GUARDAR EL TITULO DE LA VISTA
        let listTitle;

        // USAMOS UN CONDICIONAL PARA ENVIAR LOS PRODUCTOS QUE CORRESPONDAN CON EL ESTADO QUE REQUERIMOS
        switch (category) {
            case "laptops":
                productsCategory = laptopsProducts;
                listTitle = "Laptops";
                break;

            case "oficina":
                productsCategory = oficinaProducts;
                listTitle = "Oficina";
                break;

            case "estudiantes":
                productsCategory = estudiantesProducts;
                listTitle = "Estudiantes";
                break;

            case "accesorios":
                productsCategory = accesoriosProducts;
                listTitle = "Accesorios";
                break;

            case "gamer":
                productsCategory = gamerProducts ;
                listTitle = "Gamer";
                break;
    
        }


        // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
        res.render('productsCategories', {productsCategory, listTitle});
    }
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = productController;