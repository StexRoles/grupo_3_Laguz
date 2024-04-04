// REQUERIR LOS MODELOS DE LA BASE DE DATOS
const db = require('../database/models');

// REQUERIR EXPRESS-VALIDATOR
const { validationResult } = require('express-validator');

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const productController = {
    apiProducts: async (req, res) => {
        try {
            let categories = await db.Categories.findAll({
                include: [{
                    model: db.Products,
                    as: 'products',
                    attributes: []
                }],
                attributes: [
                    'name',
                    [db.sequelize.fn('COUNT', db.sequelize.col('products.id')), 'productCount']
                ],
                group: ['Categories.id']
            });

            let countByCategory = categories.map(category => ({
                category: category.name,
                count: parseInt(category.dataValues.productCount)
            }));

            let products = await db.Products.findAll({ include: ['categories', 'brands', 'status'] });

            res.status(200).send({
                count: products.length,
                countByCategory: countByCategory,
                products:
                    products.map(product => {
                        return {
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            categories: product.categories.map(category => category.name),
                            detail: `http://localhost:3020/product/api/products/${product.id}`
                        }
                    }),
                status: 200
            })

        } catch (error) {
            console.log(error);
        }

    },
    apiProductDetail: async (req, res) => {
        try {
            let product = await db.Products.findByPk(req.params.id, { include: ['categories', 'brands', 'status'] });

            res.status(200).send({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                discount: product.discount,
                categories: product.categories.map(category => category.name),
                brand: product.brands.name,
                statusProduct: product.status.name,
                image: `http://localhost:3020/img/productos/${product.image}`,
                status: 200
            })

        } catch (error) {
            console.log(error);
        }

    },
    productDetail: async (req, res) => {
        try {

            // TRAEMOS EL PRODUCTO QUE COINCIDA CON EL ID
            let product = await db.Products.findByPk(req.params.id, {
                include: [{
                    association: "brands"
                }]
            });

            // USUARIO ADMINISTRADOR ----> DEBE AJUSTARSE MAS ADELANTE
            let admin = true;

            // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
            res.render('products/productDetail', { product, admin, req });


        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }

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
        res.render('products/productCart', { cartProducts, precioTotal });
    },
    productsList: async (req, res) => {
        try {
            // TRAEMOS EL ESTADO DE LOS PRODUCTOS
            let status = req.params.status;

            // SEPARAR LOS PRODUCTOS DEPENDIENDO DEL ESTADO
            let filteredProducts = await db.Products.findAll({
                include: [{
                    model: db.Status,
                    as: 'status',
                    where: { name: status }
                }]
            });

            // VARIABLE PARA EL TITULO
            let listTitle;

            // CONDICIONAL PARA CAMBIAR EL TITULO DE LA PAGINA
            if (status == "featured") { listTitle = "Productos Destacados"; }
            else if (status == "in-sale") { listTitle = "Ofertas Destacadas"; }

            // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
            res.render('products/productsList', { filteredProducts, listTitle });

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }

    },
    productsCategories: async (req, res) => {

        try {
            // TRAEMOS LA CATEGORIA DE LOS PRODUCTOS
            let category = req.params.category;

            // SEPARAR LOS PRODUCTOS DEPENDIENDO DEL ESTADO
            let filteredProducts = await db.Products.findAll({
                include: [{
                    model: db.Categories,
                    as: 'categories',
                    where: { name: category }
                }]
            });

            // CONVIERTE LA PRIMERA LETRA EN MAYUSCULA DEL TITULO DE LA CATEGORIA
            category = category.charAt(0).toUpperCase() + category.slice(1);

            // RENDERIZAMOS LA VISTA DE PRODUCTLIST.EJS
            res.render('products/productsCategories', { filteredProducts, category });

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }

    },
    allProducts: async (req, res) => {

        try {

            // TRAEMOS EL TODOS LOS PRODUCTOS DE LA BASE DE DATOSh
            let products = await db.Products.findAll();

            // USUARIO ADMINISTRADOR ----> DEBE AJUSTARSE MAS ADELANTE
            let admin = true;

            // RENDERIZAMOS LA VISTA DE ALLPRODUCTS.EJS
            if (admin) {
                res.render('products/allProducts', { products });
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
                include: [{
                    association: "brands",
                }, {
                    association: "status"
                }, {
                    association: "categories"
                }]
            });

            // TRAEMOS EL ESTADO DE LOS PRODUCTOS
            let status = await db.Status.findAll();

            // TRAEMOS LAS CATEGORIAS
            let categories = await db.Categories.findAll();

            // TRAEMOS LAS MARCAS
            let brands = await db.Brands.findAll();

            // RENDERIZAMOS LA VISTA PRODUCTDETAIL.EJS Y LE PASAMOS LOS PRODUCTOS
            res.render('products/editProduct', { productToEdit, status, categories, brands });


        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
    },
    processEdit: async (req, res) => {
        try {
            // TRAEMOS EL PRODUCTO QUE COINCIDA CON EL ID
            let productToEdit = await db.Products.findByPk(req.params.id, {
                include: [{
                    association: "brands",
                }, {
                    association: "status"
                }, {
                    association: "categories"
                }]
            });

            // TRAEMOS EL ESTADO DE LOS PRODUCTOS
            let status = await db.Status.findAll();

            // TRAEMOS LAS CATEGORIAS
            let categories = await db.Categories.findAll();

            // TRAEMOS LAS MARCAS
            let brands = await db.Brands.findAll();

            // VALIDAMOS LOS DATOS DEL FORMULARIO
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                // SI HAY ERRORES RENDERIZAMOS LA VISTA NEWPRODUCT.EJS CON LOS ERRORES
                return res.render('products/editProduct', {
                    productToEdit,
                    status,
                    categories,
                    brands,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

            // TRAEMOS EL ID DEL PRODUCTO A EDITAR
            let idProduct = req.params.id;

            //TRAEMOS EL PRODUCTO QUE COINCIDA CON EL ID
            const product = await db.Products.findByPk(idProduct);

            //FILTRAMOS EL PRODUCTO A EDITAR 
            let productUpdate = await db.Products.update({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.file != undefined ? req.file.filename : product.iamge,
                discount: req.body.discount,
            }, {
                where: {
                    id: idProduct
                }
            })


            // ELIMINAMOS LAS CATEGORIAS QUE EXISTIAN
            let productCategoryDestroy = await db.Product_Category.destroy({
                where: {
                    product_id: idProduct
                }
            });

            // AÑADIMOS LA CATEGORIA DEL PRODUCTO EDITADO
            let categoryCreatePromises = req.body.categories.map(async (categoryId) => {
                return db.Product_Category.create({
                    product_id: product.id,
                    category_id: categoryId
                });
            });

            let categoryCreate = await Promise.all(categoryCreatePromises);


            // REDIRIGIMOS A LA VISTA DE PRODUCTDETAIL
            res.redirect("/product/allProducts/productDetail/" + idProduct);

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }

    },
    newProduct: async (req, res) => {

        // TRAEMOS EL ESTADO DE LOS PRODUCTOS
        let status = await db.Status.findAll();

        // TRAEMOS LAS CATEGORIAS
        let categories = await db.Categories.findAll();

        // TRAEMOS LAS MARCAS
        let brands = await db.Brands.findAll();

        // RENDERIZAMOS LA VISTA NEWPRODUCT.EJS
        res.render('products/newProduct', { status, categories, brands });
    },
    processCreate: async (req, res) => {
        try {

            // TRAEMOS EL ESTADO DE LOS PRODUCTOS
            let status = await db.Status.findAll();

            // TRAEMOS LAS CATEGORIAS
            let categories = await db.Categories.findAll();

            // TRAEMOS LAS MARCAS
            let brands = await db.Brands.findAll();

            // VALIDAMOS LOS DATOS DEL FORMULARIO
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                // SI HAY ERRORES RENDERIZAMOS LA VISTA NEWPRODUCT.EJS CON LOS ERRORES
                return res.render('products/newProduct', {
                    status,
                    categories,
                    brands,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }


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

            // LLAMAMOS EL PRODUCTO CREADO
            let product = await db.Products.findOne({
                where: {
                    name: req.body.name
                }
            });

            // VERIFICAMOS SI EL ARRAY DE CATEGORIAS ES UN ARRAY O UN SOLO VALOR
            let newCategories = Array.isArray(req.body.categories) ? req.body.categories : [req.body.categories];

            // AÑADIMOS LA CATEGORIA DEL PRODUCTO
            let categoryCreatePromises = newCategories.map(async (categoryId) => {
                return db.Product_Category.create({
                    product_id: product.id,
                    category_id: categoryId
                });
            });

            let categoryCreate = await Promise.all(categoryCreatePromises);


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

            // ELIMINAMOS LA RELACION DE LA TABLA PRODUCT_CATEGORY
            let productCategoryDestroy = await db.Product_Category.destroy({
                where: {
                    product_id: idProduct
                }
            });

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