var mongoose = require('mongoose');

var SemailSchema = new mongoose.Schema({
  email: { type: String, required: true}
}, { collection: 'Semails' });

module.exports = mongoose.model('Semail', SemailSchema);