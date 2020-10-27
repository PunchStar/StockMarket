var mongoose = require('mongoose');
var AddfilesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date:{type:Date},
    src:{type:String},
    type:{type:String,default:''},
    size:{type:Number},
    name:{type:String,default:''},
    id:{type:Number},
}, { toJSON: { getters: true } });
module.exports = mongoose.model('Addfiles', AddfilesSchema);