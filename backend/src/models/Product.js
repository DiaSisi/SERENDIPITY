// models/Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  stockQuantity: { type: Number, default: 0 },
  image: { type: String, required: true}, // URL de la imagen del producto
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
