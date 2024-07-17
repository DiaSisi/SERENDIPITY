// models/Purchase.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
