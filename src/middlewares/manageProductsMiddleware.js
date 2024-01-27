// MIDDLEWARE PARA EVITAR QUE LOS USUARIOS NO ADMINISTRADORES PUEDAN ACCEDER A LAS RUTAS DE ADMINISTRADOR

function manageProductsMiddleware(req, res, next) {
    if ( !req.session.userLogged || !req.session.userLogged.admin ) {
 
        return res.redirect('/');

    }

    next();
}

module.exports = manageProductsMiddleware;