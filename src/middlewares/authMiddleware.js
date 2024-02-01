// MIDDLEWARE PARA EVITAR QUE ENTREN A PROFILE, PRODUCTCART Y FAVORITES USUARIOS NO LOGUEADOS

function authMiddleware(req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/user/login');
    }

    next();
}

module.exports = authMiddleware;