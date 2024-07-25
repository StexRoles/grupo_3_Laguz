// REQUERIR EXPRESS-VALIDATOR
const { body } = require('express-validator');

// REQUERIR PATH
const path = require('path');

// HACER LAS VALIDACIONES
const validations = [
    body('name').notEmpty().withMessage('Debes completar el campo de nombre de producto').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('price').notEmpty().withMessage('Debes completar el campo de precio').isInt().withMessage('El precio debe ser un número entero'),
    body('discount').notEmpty().withMessage('Debes completar el campo de descuento').isInt().withMessage('El precio debe ser un número entero'),
    body('image')
        .custom((value, { req }) => {
            let file = req.file;
            let ext = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
            if (!file) {
                throw new Error('Debes subir una imagen');
            } else {
                let fileExt = path.extname(file.originalname);
                if (!ext.includes(fileExt)) {
                    throw new Error('Los formatos permitidos son .png, .jpg, .jpeg, .gif, .webp');
                }
            }
            return true;
        }),
    body('description').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('categories')
        .custom((value) => {
            if (!value || value.length === 0) {
                throw new Error('Debes seleccionar al menos una categoría');
            }
            return true;
        })
];

module.exports = validations;