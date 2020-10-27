var mongoose = require('mongoose');

var ImagesSchema = new mongoose.Schema({
    src: { type: String },
    albumName: { type: String },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    createDate: { type: Date }
}, { toJSON: { getters: true } });


module.exports = mongoose.model('Images', ImagesSchema);