// controllers/purchaseController.js

const Purchase = require('../models/Purchase');

// Obtener todas las compras con paginación
exports.getAllPurchases = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const purchases = await Purchase.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Purchase.countDocuments();
    res.json({
      purchases,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una compra por su ID
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Realizar una nueva compra
exports.createPurchase = async (req, res) => {
  const purchase = new Purchase(req.body);
  try {
    const newPurchase = await purchase.save();
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar una compra
exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una compra
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, { estado: 'inactivo', fechaEliminacion: Date.now() }, { new: true });
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json({ message: 'Purchase deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
