// REQUERIR BCRYPTJS
const bcryptjs = require('bcryptjs');

// REQUERIR EXPRESS-VALIDATOR
const { validationResult } = require('express-validator');

// REQUERIR LOS MODELOS DE LA BASE DE DATOS
const db = require('../database/models');

// OPERADOR DE SEQUELIZE
const { Op } = require('sequelize');

// CREANDO OBJETO LITERAL CON TODOS LOS METODOS QUE SE USARAN EN LAS RUTAS
const userController = {
    login: (req, res) => {

        // RENDERIZAMOS LA VISTA LOGIN.EJS
        res.render('user/login');
    },
    processLogin: async (req, res) => {
        try {
            // VALIDAMOS LOS DATOS DEL FORMULARIO
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                // SI HAY ERRORES RENDERIZAMOS LA VISTA REGISTER.EJS CON LOS ERRORES
                return res.render('user/login', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

            let userFound =  await db.Users.findOne({
                where: {
                    [Op.or]: [
                        { email: req.body.identifier },
                        { username: req.body.identifier }
                    ]
                }
            });

            // SE COMPRUEBA QUE EL USUARIO EXISTA
            if (userFound) {
                // SE COMPRUEBA QUE LA CONTRASEÑA SEA CORRECTA
                let passwordHash = bcryptjs.compareSync(req.body.password, userFound.password);

                if (passwordHash) {

                    // SI LA CONTRASEÑA ES CORRECTA SE CREA UNA SESSION
                    req.session.userLogged = userFound;

                    // ELIMINAMOS LA CONTRASEÑA DEL USUARIO POR SEGURIDAD
                    delete req.session.userLogged.password;

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

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
    },
    profile: async(req, res) => {

        try {

            // TRAEMOS LA INFORMACION DEL USUARIO LOGUEADO
            let userInformation = await db.Users.findByPk(req.session.userLogged.id, {
                include: [{ association: 'countries', include: [{ association: 'cities' }] }]
            });

            // GENERA UN NUMERO ALEATORIO 
            const randomNumber = Math.floor(Math.random() * 9) + 1;

            // TRAEMOS EL LISTADO DE PAISES
            let countries = await db.Countries.findAll();

            // RENDERIZAMOS LA VISTA PROFILE.EJS
            res.render('user/profile', { randomNumber, userInformation, countries });

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }

    },
    editProfile:async(req, res) => {
        try {
            
            // TRAEMOS EL ID DEL USUARIO A EDITAR
            let idUser = req.session.userLogged.id;

            // TRAEMOS EL USUARIO QUE COINCIDA CON EL ID
            let userToEdit = await db.Users.findByPk(idUser);

            // EDITAR USARIO
            let editUser = await db.Users.update({
                nickname: req.body.name != '' ? req.body.name : userToEdit.nickname,
                avatar: req.file != undefined ? req.file.filename : userToEdit.avatar,
                country_id: req.body.country != '' ? req.body.country : userToEdit.country_id,
                /* city: req.body.city != '' ? req.body.city : userToEdit.city, */
            },{
                where: {
                    id: idUser
                }
            });

            // REDIRIGIMOS AL PERFIL DEL USUARIO
            res.redirect('/user/profile');

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }
  
    },   
    logout: (req, res) => {

        // ELIMINA LA COOKIE
        res.clearCookie('userIdentifier');

        // DESTRUYE LA SESSION
        req.session.destroy();
    
        // REDIRIGE AL HOME
        return res.redirect('/');

    },
    restPassword:(req,res)=>{
        res.render('user/restPassword.ejs');
    },
    restPasswordProcess:(req, res) => {

            // VALIDAMOS LOS DATOS DEL FORMULARIO
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                // SI HAY ERRORES RENDERIZAMOS LA VISTA REGISTER.EJS CON LOS ERRORES
                return res.render('user/restPassword', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
        // REDIRIGE AL HOME
        return res.redirect('/');
    },
    register: (req, res) => {

        // RENDERIZAMOS LA VISTA REGISTER.EJS
        res.render('user/register');

    },
    processRegister:async(req, res) => {
        try {
            // VALIDAMOS LOS DATOS DEL FORMULARIO
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {

                // SI HAY ERRORES RENDERIZAMOS LA VISTA REGISTER.EJS CON LOS ERRORES
                return res.render('user/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }


            // BUSCAR SI EL USUARIO YA EXISTE
            let userExist = await db.Users.findOne({
                where: {
                    [Op.or]: [
                        { email: req.body.email},
                        { username: req.body.user}
                    ]
                }
            });

            if (userExist) {
                // SI EL USUARIO YA EXISTE
                return res.render('user/register', {
                    errors: {
                        user: {
                            msg: 'Este usuario ya existe'
                        }
                    },
                    oldData: req.body
                });
            } else {
                // AGREGAMOS LA INFO DEL USUARIO A UNA VARIABLE
                let newUser = await db.Users.create({
                    username: req.body.user,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    admin: 0,
                    avatar: 'default.avif',
                });

                // REDIRIGIMOS AL LOGIN
                res.redirect('/user/login');
            }

        } catch (error) {
            console.log(error);
            res.status(404).render('main/not-found');
        }               
    },
};

// EXPORTANDO EL OBJETO LITERAL PARA PODER USAR LAS FUNCIONES EN EL ROUTER
module.exports = userController;