var mongoose = require('mongoose');

var AreaSchema = new mongoose.Schema({
    value: { type: Number },
    name: { type: String },
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
}, { collection: 'locations' });
module.exports = mongoose.model('Area', AreaSchema);