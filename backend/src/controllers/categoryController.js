// controllers/categoryController.js

const Category = require('../models/Category');

// Traer todas las categorías
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: 'active' });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Traer una categoría por ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category || category.status === 'inactive') return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar una categoría
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una categoría (soft delete)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive', deletedAt: Date.now() },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};