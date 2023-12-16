// REQUERIR EXPRESS Y USAR ROUTER
const express = require('express');
const router = express.Router();

// REQUERIR userController PARA USAR SUS METODOS
const userController = require('../controllers/userController.js');

//---------------------------------------------------------------//

//RUTA PARA EL LOGIN
router.get('/users/login', userController.login);

//RUTA PARA EL REGISTRO
router.get('/users/register', userController.register);

//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;