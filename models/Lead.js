var mongoose = require('mongoose');

var LeadSchema = new mongoose.Schema({
  fullName: { type: String }, 
  clientEmail:{type:String},
  phoneNumber:{type:String, required:true},
  phoneOPT:{type:String},
  eventDate:{type:Date},
  eventCity:{type:Number},
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  leadStatus:{type:String,default:'pending'}  //called today, later, booked, archievd/cancelled leads
},  { toJSON: { getters: true }});

var LeadModel = mongoose.model('Lead', LeadSchema);

module.exports = LeadModel;