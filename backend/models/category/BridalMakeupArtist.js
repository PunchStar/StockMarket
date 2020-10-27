var mongoose = require('mongoose');

var BridalMakeupArtistSchema = new mongoose.Schema({
  otherWorkLocation: [{ type: String }],
  haveStudio : {type:Boolean},
  serviceOffered :{
    regularMakeup:{type:Number},
    airbrushMakeup:{type:Number},
    guestMakeup:{type:Number},
    hairstyling:{type:Number},
    nailPaint:{type:Number},
    draping:{type:Number},
    mehendi:{type:Number},
    jewellery:{type:Number}
  },
  travelToClientVenue:{type:Boolean},
  travelCost: { type: String },
  travelOtherIndianCities: { type: Boolean },

  travelMarkeupCharges:{type:String},
  brandsUsed:{type:String}
}, {_id: false, toJSON: { getters: true }});

module.exports = BridalMakeupArtistSchema;
