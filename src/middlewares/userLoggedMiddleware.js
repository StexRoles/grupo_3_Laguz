// MIDDLEWARE PARA ENVIAR LA VARIABLE A REQ.SESSIO.USERLOGGED A TODAS LAS VISTAS
function userLoggedMiddleware (req, res, next){
    if (req.session.userLogged) {

        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;