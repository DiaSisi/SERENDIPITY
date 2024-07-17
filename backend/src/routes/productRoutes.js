// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getProducts);

// Obtener un producto por su ID
router.get('/:id', productController.getProductById);

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Actualizar un producto por su ID
router.put('/:id', productController.updateProduct);

// Eliminar un producto por su ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
