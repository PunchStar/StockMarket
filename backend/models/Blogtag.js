var mongoose = require('mongoose');

var BlogtagSchema = new mongoose.Schema({
  value: { type: Number },
  name: { type: String },
  type:{type:String},
}, { toJSON: { getters: true }} );
module.exports = mongoose.model('Blogtag', BlogtagSchema);
