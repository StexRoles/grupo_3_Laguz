// MIDDLEWARE PARA RECORDAR AL USUARIO CON UNA COOKIE Y QUE PUEDA INICIAR SESION AUTOMATICAMENTE
// REQUERIR LOS MODELOS DE LA BASE DE DATOS
const db = require('../database/models');

// OPERADOR DE SEQUELIZE
const { Op } = require('sequelize');

async function rememberUserMiddleware(req, res, next) {
    try {
        // LLAMAMOS A LA COOKIE QUE CREAMOS EN EL LOGIN Y BUSCAMOS EL USUARIO QUE CORRESPONDE
        let identifierCookie = req.cookies.userIdentifier;
        // BUSCAR SI EL USUARIO YA EXISTE
        if (identifierCookie) {
            let userFromCookie = await db.Users.findOne({
                where: {
                    [Op.or]: [
                        { email: identifierCookie },
                        { username: identifierCookie }
                    ]
                }
            });
    
            // SI EL USUARIO EXISTE SE CREA UNA SESSION
            if (userFromCookie) {
    
                req.session.userLogged = userFromCookie;
            }
        }
        
    } catch (error) {
        console.log(error)
    }


    next();
}

module.exports = rememberUserMiddleware;