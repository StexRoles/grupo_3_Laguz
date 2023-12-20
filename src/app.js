/* REQUERIMOS EXPRESS Y LO GUARDAMOS EN LA VARIABLE APP */
const express = require('express');
const app = express();
const methodOverride = require('method-override');

// REQUERIMOS PATH PARA UTILIZAR RUTAS COMPLETAS O DE FICHERO 
const path = require('path');

// SERVIDOR EN PUERTO 3000
const port = process.env.PORT || 3020;
app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});

// METODO PARA RECURSOS ESTATICOS Y PUBLICOS 
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false})); //TOMA LOS DATOS DEL BODY
app.use(express.json()); //TOMA LOS DATOS DEL BODY
app.use(methodOverride('_method'));

// CONFIGURAR MOTOR DE PLANTILLAS ENGINE JAVA SCRIPT
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// REQUERIMOS ROUTER EN CADA VARIABLE DONDE SE USARA: APP.JS --> ROUTER --> CONTROLLER
const mainRouter = require('./routers/mainRouter.js');
const userRouter = require('./routers/userRouter.js');
const productRouter = require('./routers/productRouter.js');

// USAMOS EL ROUTER EN LA RUTA BASE
app.use('/', mainRouter);

// USAMOS EL ROUTER PARA EL USUARIO
app.use('/user', userRouter);

// USAMOS EL ROUTER PARA LOS PRODUCTOS
app.use('/product', productRouter);


