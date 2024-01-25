// REQUERIR EXPRESS-VALIDATOR
const { body } = require('express-validator');

// HACER LAS VALIDACIONES
const validations = [
    body('identifier').notEmpty().withMessage('Debes completar el campo de usuario o email'),
    body('password').notEmpty().withMessage('Debes completar el campo de contraseña'),
];

module.exports = validations;