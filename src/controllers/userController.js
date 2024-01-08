//REQUERIR PATH
const path = require('path');

// REQUERIR FS
const fs = require('fs');

// TRAE TODOS LOS USUARIOS DEL JSON Y LOS GUARDA EN UNA VARIABLE
const usersFilePath = path.join(__dirname, '../model/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const userController = {
    login: (req, res) => {

        // RENDERIZAMOS LA VISTA LOGIN.EJS
        res.render('user/login');

    },
    register: (req, res) => {

        // RENDERIZAMOS LA VISTA REGISTER.EJS
        res.render('user/register');

    },
    
    processCreate: (req, res) => {
        console.log(req.body);
    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = userController;