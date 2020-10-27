var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var LocationSchema = new mongoose.Schema({
    value: { type: Number },
    name: { type: String },
    preference: { type: String },
    summary: { type: String }
}, { collection: 'Cities' });
module.exports = mongoose.model('City', LocationSchema);