// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Obtener todas las categorías
router.get('/', categoryController.getAllCategories);

// Obtener una categoría por su ID
router.get('/:id', categoryController.getCategoryById);

// Crear una nueva categoría
router.post('/', categoryController.createCategory);

// Actualizar una categoría por su ID
router.put('/:id', categoryController.updateCategory);

// Eliminar una categoría por su ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
