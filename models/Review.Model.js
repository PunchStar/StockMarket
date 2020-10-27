var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    Responsiveness: { type: Number },
    Professionalism: { type: Number },
    Value: { type: Number },
    Flexibility: { type: Number },
    Behaviour: { type: Number },
    reviewName: { type: String },
    reviewPhone: { type: Number },
    reviewEmail: { type: String },
    reviewSubject: { type: String },
    reviewWrite: { type: String },
    reviewOverallRating: { type: String },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    reviewDate: { type: Date }
}, { toJSON: { getters: true } });


module.exports = mongoose.model('Review', ReviewSchema);