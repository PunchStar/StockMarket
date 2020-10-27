var mongoose = require('mongoose');

var BlogcategorySchema = new mongoose.Schema({
  value: { type: Number },
  name: { type: String },
  type:{type:String},
}, { toJSON: { getters: true }} );
module.exports = mongoose.model('Blogcategory', BlogcategorySchema);
