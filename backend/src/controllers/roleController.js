// controllers/roleController.js

const Role = require('../models/Role');

// Traer todos los roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({ status: 'active' });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Traer un rol por ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || role.status === 'inactive') return res.status(404).json({ message: 'Role not found' });
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
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un rol (soft delete)
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive', deletedAt: Date.now() },
      { new: true }
    );
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};