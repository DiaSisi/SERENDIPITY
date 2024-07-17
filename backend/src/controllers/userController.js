// controllers/userController.js

const User = require('../models/User');

// Traer todos los usuarios con paginación
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({ status: 'active' })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await User.countDocuments({ status: 'active' });
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Traer un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.status === 'inactive') return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un usuario (soft delete)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive', deletedAt: Date.now() },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};