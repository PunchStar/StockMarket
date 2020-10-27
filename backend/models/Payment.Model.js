var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
    amount: { type: Number },
    fromTo: { type: Number, default: 0 },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    content: { type: String },
    date: { type: Date },
    tokenId: { type: String },
    status: { type: String }
}, { toJSON: { getters: true } });


module.exports = mongoose.model('Payment', PaymentSchema);