// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Obtener un usuario por su ID
router.get('/:id', userController.getUserById);

// Registrar un nuevo usuario
router.post('/', userController.registerUser);

// Actualizar un usuario por su ID
router.put('/:id', userController.updateUser);

// Eliminar un usuario por su ID
router.delete('/:id', userController.deleteUser);

module.exports = router;