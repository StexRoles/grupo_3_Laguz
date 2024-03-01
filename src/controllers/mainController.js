const db = require('../database/models');

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const mainController = {
    index: async (req, res) => {
        try {

            // SEPARAR LOS PRODUCTOS DE DESTACADOS
            let featuredProducts = await db.Products.findAll({
                include : [{
                    model: db.Status,
                    as: 'status',
                    where: { name: 'featured'}
                }]
            });

            // SEPARAR LOS PRODUCTOS DE DESTACADOS
            let inSaleProducts = await db.Products.findAll({
                include : [{
                    model: db.Status,
                    as: 'status',
                    where: { name: 'in-sale'}
                }]
            });

            // RENDERIZAMOS LA VISTA INDEX.EJS
            res.render('main/index', {featuredProducts, inSaleProducts});


        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
      
    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = mainController;