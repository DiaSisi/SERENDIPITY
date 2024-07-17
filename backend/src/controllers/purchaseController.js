// controllers/purchaseController.js

const Purchase = require('../models/Purchase');

// Traer todas las compras con paginación
exports.getPurchases = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const purchases = await Purchase.find({ status: 'active' })
      .populate('user')
      .populate('products.product')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Purchase.countDocuments({ status: 'active' });
    res.json({
      purchases,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Traer una compra por ID
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate('user')
      .populate('products.product');
    if (!purchase || purchase.status === 'inactive') return res.status(404).json({ message: 'Purchase not found' });
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva compra
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
    const purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una compra (soft delete)
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive', deletedAt: Date.now() },
      { new: true }
    );
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json({ message: 'Purchase deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};