var mongoose = require('mongoose');

var ClientRequestSchema = new mongoose.Schema({
  fullName: { type: String }, 
  clientEmail:{type:String},
  phoneNumber:{type:String, required:true},
  phoneOPT:{type:String},
  eventDate:{type:Date},
  eventCity:{type:Number},
  maxBudget:{type:Number},
  additionalContent:{type:String},
  serviceInfo:[String],
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  reqStatus:{type:String,default:'false'}
},  { toJSON: { getters: true }});

var ClientRequestModel = mongoose.model('ClientRequest', ClientRequestSchema);

module.exports = ClientRequestModel;  