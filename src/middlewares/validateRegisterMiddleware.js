// REQUERIR EXPRESS-VALIDATOR
const { body } = require('express-validator');

// HACER LAS VALIDACIONES
const validations = [
    body('user').notEmpty().withMessage('Debes completar el campo de usuario') .isLength ({  min: 2 }) .withMessage("El nombre de usuario debe tener como minimo 2 caracteres"),
    body('email').notEmpty().withMessage('Debes completar el campo de email').bail().isEmail().withMessage('Debes completar con un email válido'),
    body('password').notEmpty().withMessage('Debes completar el campo de contraseña') .isLength ({  min: 8 }) .withMessage("La contraseña debe tener como minimo 8 caracteres"),
    body('repassword').notEmpty().withMessage('Debes completar el campo de confirmar contraseña'),
    body('repassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
];

module.exports = validations;