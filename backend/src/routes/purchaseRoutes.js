// routes/purchaseRoutes.js

const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Obtener todas las compras
router.get('/', purchaseController.getPurchases);

// Obtener una compra por su ID
router.get('/:id', purchaseController.getPurchaseById);

// Realizar una nueva compra
router.post('/', purchaseController.createPurchase);

// Actualizar una compra por su ID
router.put('/:id', purchaseController.updatePurchase);

// Eliminar una compra por su ID
router.delete('/:id', purchaseController.deletePurchase);

module.exports = router;
