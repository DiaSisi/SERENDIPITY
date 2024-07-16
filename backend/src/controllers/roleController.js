// controllers/roleController.js

const Role = require('../models/Role');

// Obtener todos los roles con paginación
exports.getAllRoles = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const roles = await Role.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Role.countDocuments();
    res.json({
      roles,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un rol por su ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  const role = new Role(req.body);
  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un rol
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un rol
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, { estado: 'inactivo', fechaEliminacion: Date.now() }, { new: true });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
