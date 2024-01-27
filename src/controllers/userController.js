//REQUERIR PATH
const path = require('path');

// REQUERIR FS
const fs = require('fs');

// REQUERIR BCRYPTJS
const bcryptjs = require('bcryptjs');

// REQUERIR EXPRESS-VALIDATOR
const { validationResult } = require('express-validator');

// TRAE TODOS LOS USUARIOS DEL JSON Y LOS GUARDA EN UNA VARIABLE
const usersFilePath = path.join(__dirname, '../model/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const userController = {
    login: (req, res) => {

        // RENDERIZAMOS LA VISTA LOGIN.EJS
        res.render('user/login');
    },
    processLogin: (req, res) => {

        // VALIDAMOS LOS DATOS DEL FORMULARIO
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {

            // SI HAY ERRORES RENDERIZAMOS LA VISTA REGISTER.EJS CON LOS ERRORES
            return res.render('user/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // BUSCAMOS EL USUARIO POR EMAIL O USUARIO
        let userFound = users.find(user => user.email === req.body.identifier || user.user === req.body.identifier);

        // SE COMPRUEBA QUE EL USUARIO EXISTA
        if (userFound) {
            // SE COMPRUEBA QUE LA CONTRASEÑA SEA CORRECTA
            let passwordHash = bcryptjs.compareSync(req.body.password, userFound.password);

            if (passwordHash) {
                // CREAR UNA COPIA userFound PARA PODER GUARDAR EN SESSION Y ELIMINAR LA CONTRASEÑA
                let userToLogin = JSON.parse(JSON.stringify(userFound));

                // ELIMINAMOS LA CONTRASEÑA DEL USUARIO POR SEGURIDAD
                delete userToLogin.password;

                // SI LA CONTRASEÑA ES CORRECTA SE CREA UNA SESSION
                req.session.userLogged = userToLogin;

                // CREAMOS UNA COOKIE PARA RECORDAR AL USUARIO
                res.cookie('userIdentifier', req.body.identifier, { maxAge: (1000 * 60) * 60 * 24 * 7 });

                // SE REDIRIGE AL PERFIL DEL USUARIO
                return res.redirect('/user/profile');
            }

            // SI LA CONTRASEÑA ES INCORRECTA
            return res.render('user/login', {
                errors: {
                    password: {
                        msg: 'La contraseña es incorrecta'
                    }
                },
                oldData: req.body
            });
        }

        // SI NO SE ENCONTRO EL USUARIO
        return res.render('user/login', {
            errors: {
                identifier: {
                    msg: 'Las credenciales son inválidas'
                }
            }, 
            oldData: req.body
        });
    },
    profile: (req, res) => {

        // TRAEMOS TODOS LOS USUARIOS
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        // BUSCAMOS EL USUARIO QUE COINCIDA CON EL ID
        let userInformation = users.find(user => user.id == req.session.userLogged.id);

        // GENERA UN NUMERO ALEATORIO 
        const randomNumber = Math.floor(Math.random() * 9) + 1;

        // RENDERIZAMOS LA VISTA PROFILE.EJS
        res.render('user/profile', { randomNumber, userInformation });
    },
    editProfile: (req, res) => {

        // TRAEMOS TODOS LOS USUARIOS
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        // BUSCAMOS EL USUARIO QUE COINCIDA CON EL ID
        let userToEdit = users.find(user => user.id == req.session.userLogged.id);

        // AÑADIMOS LA INFORMACION A UNA VARIABLE
        userToEdit = {
            ...userToEdit,
            name: req.body.name,
            avatar: req.body.avatar,
            country: req.body.country,
            city: req.body.city,
        }

        // BUSCAMOS EL INDICE DEL USUARIO QUE COINCIDA CON EL ID
        let indice = users.findIndex(user => { return user.id == req.session.userLogged.id });

        // ACTUALIZAMOS Y REESCRIBIMOS EL JSON
        users[indice] = userToEdit;
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
       
        // REDIRIGIMOS AL PERFIL DEL USUARIO
        res.redirect('/user/profile');
    },   
    logout: (req, res) => {

        // ELIMINA LA COOKIE
        res.clearCookie('userIdentifier');

        // DESTRUYE LA SESSION
        req.session.destroy();
    
        // REDIRIGE AL HOME
        return res.redirect('/');

    },
    register: (req, res) => {

        // RENDERIZAMOS LA VISTA REGISTER.EJS
        res.render('user/register');

    },
    processRegister: (req, res) => {

        // VALIDAMOS LOS DATOS DEL FORMULARIO
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {

            // SI HAY ERRORES RENDERIZAMOS LA VISTA REGISTER.EJS CON LOS ERRORES
            return res.render('user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = userController;