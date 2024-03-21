// REQUERIR EXPRESS-VALIDATOR
const { body } = require('express-validator');

// REQUERIR PATH
const path = require('path');

// HACER LAS VALIDACIONES
const validations = [
    body('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('avatar')
        .custom((value, { req }) => {
            let file = req.file;
            let ext = ['.png', '.jpg', '.jpeg', '.gif'];
            if (!file) {
                return true;
            } else {
                let fileExt = path.extname(file.originalname);
                if (!ext.includes(fileExt)) {
                    throw new Error('Los formatos permitidos son .png, .jpg, .jpeg, .gif');
                }
            }
            return true;
        }),
];

module.exports = validations;