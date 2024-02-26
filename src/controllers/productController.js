// REQUERIR PATH
const path = require('path');

// REQUERIR LOS MODELOS DE LA BASE DE DATOS
const db = require('../database/models');

// REQUERIR FS
const fs = require('fs');

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

        // USUARIO ADMINISTRADOR ----> DEBE AJUSTARSE MAS ADELANTE
        let admin = true;
    
        // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
        res.render('products/productDetail', {singleProduct, admin, req});
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
    productsList: async (req, res) => {
        try {
            // TRAEMOS EL ESTADO DE LOS PRODUCTOS
            let status = req.params.status;

            // SEPARAR LOS PRODUCTOS DEPENDIENDO DEL ESTADO
            let filteredProducts = await db.Products.findAll({
                include : [{
                    model: db.Status,
                    as: 'status',
                    where: { name: status}
                }]
            });

             // VARIABLE PARA EL TITULO
            let listTitle;

            // CONDICIONAL PARA CAMBIAR EL TITULO DE LA PAGINA
            if (status == "featured") { listTitle = "Productos Destacados"; }
            else if (status == "in-sale"){ listTitle = "Ofertas Destacadas"; }

            // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
            res.render('products/productsList', {filteredProducts, listTitle});

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
        
    },
    productsCategories: (req, res) => {
        
        // TRAEMOS LA CATEGORIA DE LOS PRODUCTOS
        let category = req.params.category;

        // TRAE TODOS LOS PRODUCTOS DEL JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // REVISAR SI LOS PRODUCTOS TIENEN LA CATEGORIA QUE SE REQUIERE
        const filteredProducts = products.filter((product) => {
            return product.categories.includes(category);
        });

        // CONVIERTE LA PRIMERA LETRA EN MAYUSCULA DEL TITULO DE LA CATEGORIA
        category = category.charAt(0).toUpperCase() + category.slice(1);

        // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
        res.render('products/productsCategories', {filteredProducts, category});
    }, 
    allProducts: async (req, res) => {
    
        try {

            // TRAEMOS EL TODOS LOS PRODUCTOS DE LA BASE DE DATOSh
            let products = await db.Products.findAll();

            // USUARIO ADMINISTRADOR ----> DEBE AJUSTARSE MAS ADELANTE
            let admin = true;

            // RENDERIZAMOS LA VISTA DE ALLPRODUCTS.EJS
            if (admin) {
                res.render('products/allProducts', {products});
            }


        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
        
    },
    editProduct: async (req, res) => {
        try {
            // TRAEMOS EL PRODUCTO QUE COINCIDA CON EL ID
            let productToEdit = await db.Products.findByPk(req.params.id, {
                include : [{
                    association : "brands",
                }, {
                    association : "status"
                }, {
                    association : "categories"
                }]
            });

            // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
            res.render('products/editProduct', {productToEdit});


        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
    },
    processEdit: async (req, res) => {
        try {
            // TRAEMOS EL PRODUCTO QUE COINCIDA CON EL ID
            let productToEdit = await db.Products.findByPk(req.params.id, {
                include : [{
                    association : "brands",
                }, {
                    association : "status"
                }, {
                    association : "categories"
                }]
            });

            // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
            res.render('products/editProduct', {productToEdit});


        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }

    },
    newProduct:  async (req, res) => {
        // TRAEMOS EL ESTADO DE LOS PRODUCTOS
        let status = await db.Status.findAll();

        // TRAEMOS LAS CATEGORIAS
        let categories = await db.Categories.findAll();

        // TRAEMOS LAS MARCAS
        let brands = await db.Brands.findAll();

        // RENDERIZAMOS LA VISTA NEWPRODUCT.EJS
        res.render('products/newProduct', {status, categories, brands});
    },
    processCreate: async (req, res) => {
        try {

            // FILTRAMOS EL PRODUCTO A EDITAR
            let productCreate = await db.Products.create({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.file.filename,
                discount: req.body.discount,
                brand_id: req.body.brand,
                status_id: req.body.status,
            });

            // REDIRECCIONAR AL DETALLE DEL PRODUCTO
            res.redirect("/product/allProducts");

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }

    },
    destroy: async (req, res) => {

        try {
            // TRAEMOS EL ID DEL PRODUCTO A EDITAR
            let idProduct = req.params.id;

            // ELIMINAMOS EL PRODUCTO QUE COINCIDA CON EL ID
            let productDestroy = await db.Products.destroy({
                where: {
                    id: idProduct
                }
            })

            // REDIRECCIONAMOS A LA LISTA DE PRODUCTOS
            res.redirect("/product/allProducts");

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
},
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = productController;