// MIDDLEWARE PARA QUE NO PUEDAN ACCEDER A LAS RUTAS DE LOGGIN O REGISTER SI YA ESTAN LOGUEADOS

function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/user/profile');
    }

    next();
}

module.exports = guestMiddleware;