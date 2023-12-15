// REQUERIR EXPRESS Y USAR ROUTER
const express = require('express');
const router = express.Router();

// REQUERIR mainController PARA USAR SUS METODOS
const mainController = require('../controllers/mainController.js');

//---------------------------------------------------------------//

//RUTA PARA EL HOME
router.get('/', mainController.index);


//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;