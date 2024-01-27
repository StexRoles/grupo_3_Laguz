// MIDDLEWARE PARA RECORDAR AL USUARIO CON UNA COOKIE Y QUE PUEDA INICIAR SESION AUTOMATICAMENTE

const path = require('path'); //REQUERIR PATH
const fs = require('fs'); // REQUERIR FS

// TRAE TODOS LOS USUARIOS DEL JSON Y LOS GUARDA EN UNA VARIABLE
const usersFilePath = path.join(__dirname, '../model/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function rememberUserMiddleware(req, res, next) {
    
    // LLAMAMOS A LA COOKIE QUE CREAMOS EN EL LOGIN Y BUSCAMOS EL USUARIO QUE CORRESPONDE
    let identifierCookie = req.cookies.userIdentifier;
    let userFromCookie = users.find(user => user.email === identifierCookie || user.user === identifierCookie);

    // SI EL USUARIO EXISTE SE CREA UNA SESSION
    if (userFromCookie) {

        delete userFromCookie.password;

        req.session.userLogged = userFromCookie;
    }

    next();
}

module.exports = rememberUserMiddleware;