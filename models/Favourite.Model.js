var mongoose = require('mongoose');

var FavouriteSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    date: Date,
}, { toJSON: { getters: true } });


module.exports = mongoose.model('Favourite', FavouriteSchema);