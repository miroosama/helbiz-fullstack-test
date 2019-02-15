const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema({
  from: String,
  to: String,
  amount: Number
}, { strict: false, timestamps: true })

module.exports = Transfer = mongoose.model('transfer', TransferSchema);
