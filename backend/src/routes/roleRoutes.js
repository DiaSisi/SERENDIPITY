// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Obtener todos los roles
router.get('/', roleController.getRoles);

// Obtener un rol por su ID
router.get('/:id', roleController.getRoleById);

// Crear un nuevo rol
router.post('/', roleController.createRole);

// Actualizar un rol por su ID
router.put('/:id', roleController.updateRole);

// Eliminar un rol por su ID
router.delete('/:id', roleController.deleteRole);

module.exports = router;
