// models/OrangHilang.js
const mongoose = require('mongoose');

const orangHilangSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  umur: { type: Number, required: true },
  terakhirDilihat: { type: Date, required: true },
  lokasi: { type: String, required: true },
  status: { type: String, default: 'hilang' },
  foto: { type: String } // URL untuk foto (opsional)
});

const OrangHilang = mongoose.model('OrangHilang', orangHilangSchema);

module.exports = OrangHilang;
