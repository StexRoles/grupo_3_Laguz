// REQUERIR EXPRESS-VALIDATOR
const { body } = require('express-validator');

// HACER LAS VALIDACIONES
const validations = [
    body('identifierRest').notEmpty().withMessage('Debes completar el campo de usuario o email'),
];

module.exports = validations;