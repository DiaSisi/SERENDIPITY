//// models/.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  image: { type: String, default:'../img/defaultavatar.png'}, // URL de la imagen del usuario
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deleteAt: { type: Date },
  status: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;