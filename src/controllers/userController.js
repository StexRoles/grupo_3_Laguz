//REQUERIR PATH
const path = require('path');

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const userController = {
    login: (req, res) => {

        // RENDERIZAMOS LA VISTA LOGIN.EJS
        res.render('login');

    },
    register: (req, res) => {

        // RENDERIZAMOS LA VISTA REGISTER.EJS
        res.render('register');

    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = userController;