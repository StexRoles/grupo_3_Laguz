/* REQUERIMOS EXPRESS Y LO GUARDAMOS EN LA VARIABLE APP */
const express = require('express');
const app = express();

const methodOverride = require('method-override'); // REQUERIMOS METHOD-OVERRIDE PARA PODER USAR PUT Y DELETE
const session = require('express-session'); // REQUERIMOS EXPRESS-SESSION PARA PODER USAR SESSIONES
const cookies = require('cookie-parser'); // REQUERIMOS COOKIE-PARSER PARA PODER USAR COOKIES
const path = require('path'); // REQUERIMOS PATH PARA UTILIZAR RUTAS COMPLETAS O DE FICHERO 
const rememberUserMiddleware = require('./middlewares/rememberUserMiddleware.js'); // REQUERIMOS EL MIDDLEWARE PARA RECORDAR AL USUARIO

// MIDDLEWARES GLOBALES
app.use(express.static(path.join(__dirname, '../public'))); // PARA USAR ARCHIVOS ESTATICOS
app.use(express.urlencoded({extended: false})); //TOMA LOS DATOS DEL BODY
app.use(express.json()); //TOMA LOS DATOS DEL BODY
app.use(methodOverride('_method')); // PARA PODER USAR PUT Y DELETE
app.use(session({ 
    secret: 'Shhh, here is a secret', 
    resave: false,
    saveUninitialized: false
})); // PARA PODER USAR SESSIONES
app.use(cookies()); // PARA PODER USAR COOKIES
app.use(rememberUserMiddleware); // PARA RECORDAR AL USUARIO

// CONFIGURAR MOTOR DE PLANTILLAS ENGINE JAVA SCRIPT
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// REQUERIMOS ROUTER EN CADA VARIABLE DONDE SE USARA: APP.JS --> ROUTER --> CONTROLLER
const mainRouter = require('./routers/mainRouter.js');
const userRouter = require('./routers/userRouter.js');
const productRouter = require('./routers/productRouter.js');

// ------------------------------------------------------------------------------------------ //

// USAMOS EL ROUTER EN LA RUTA BASE
app.use('/', mainRouter);

// USAMOS EL ROUTER PARA EL USUARIO
app.use('/user', userRouter);

// USAMOS EL ROUTER PARA LOS PRODUCTOS
app.use('/product', productRouter);

// ------------------------------------------------------------------------------------------ //

// SERVIDOR EN PUERTO 3020
const port = process.env.PORT || 3020;
app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});
