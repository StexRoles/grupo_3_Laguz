// REQUERIR EXPRESS Y USAR ROUTER
const express = require('express');
const router = express.Router();

// MIDLEWARES DE RUTAS
const validationsRegister = require('../middlewares/validateRegisterMiddleware.js'); // VALIDACIONES REGISTRO
const validationsLogin = require('../middlewares/validateLoginMiddleware.js'); // VALIDACIONES LOGIN
const validateRestPassword = require('../middlewares/validateRestPasswordMiddleware.js');//VALIDACIONES PARA RESTABLECER CONTRASE;A
const guestMiddleware = require('../middlewares/guestMiddleware.js'); // EVITA ENTRAR A LOGIN SI YA ESTAS LOGEADO
const authMiddleware = require('../middlewares/authMiddleware.js'); // EVITA ENTRAR A PROFILE SI NO ESTAS LOGEADO
const validateUserInformationMiddleware = require('../middlewares/validateUserInformationMiddleware.js'); // VALIDACIONES PARA EDITAR PERFIL
const upload = require('../middlewares/multerProfileMiddleware.js'); // MULTER PARA SUBIR IMAGENES

// REQUERIR userController PARA USAR SUS METODOS
const userController = require('../controllers/userController.js');

//---------------------------------------------------------------//

// RUTA PARA LA API DE USUARIOS ---> http://localhost:3020/user/api/users
router.get('/api/users', userController.apiUsers);

// RUTA PARA LA API DE DETALLE DE USUARIO ---> http://localhost:3020/user/api/users/:id
router.get('/api/users/:id', userController.apiUserDetail);

// RUTA PARA EL LOGIN
router.get('/login', guestMiddleware, userController.login);
router.post('/login', validationsLogin, userController.processLogin);

// RUTA PARA EL REGISTRO
router.get('/register', userController.register);
router.post('/register', validationsRegister, userController.processRegister);

// RUTA PARA EL PERFIL
router.get('/profile', authMiddleware, userController.profile);

// RUTA PARA EL EDITAR PERFIL
router.put('/profile', upload.single("avatar"), authMiddleware, validateUserInformationMiddleware, userController.editProfile);

// RUTA PARA EL LOGOUT
router.get('/logout', userController.logout);

// RUTA PARA RESTABLECER LA CONTRASEÑA
router.get('/restPassword',userController.restPassword);
router.post('/restPassword',validateRestPassword,userController.restPasswordProcess);
//---------------------------------------------------------------//
// EXPORTAR ROUTER
module.exports = router;