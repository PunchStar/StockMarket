var mongoose = require('mongoose');
var RequestsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    date:{type:Date},
    equity:{type:Number},
    id:{type:Number},
    status:{type:String, default:'Pending'}
}, { toJSON: { getters: true } });
module.exports = mongoose.model('Requests', RequestsSchema);