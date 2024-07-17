// models/Category.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
