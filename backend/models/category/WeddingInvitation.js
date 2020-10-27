var mongoose = require('mongoose');

var WeddingInvitationSchema = new mongoose.Schema({
  startingPrice:{type:Number},
  serviceOffered : {
    boxedInvites:{type:Boolean},
    unboxedInvites:{type:Boolean},
    digitalECards:{type:Boolean},
    onlyCardDesign:{type:Boolean},
    other:{type:Boolean}
  },
  boxedMinPrice:{type:Number},
  boxedMaxPrice:{type:Number},
  boxedMinCards:{type:Number},

  unboxedMinPrice:{type:Number},
  unboxedMaxPrice:{type:Number},
  unboxedMinCards:{type:Number},

  ecardStartingPrice:{type:Number},
  designingStartingPrice:{type:Number},
  otherInvitation:{type:String},
  // speciality : {
  //   traditionalInvitations:{type:Number},
  //   funkyOfbeatInvitations:{type:Number},
  //   handmadeCards:{type:Number},
  //   modernInvites:{type:Number},
  //   boxedInvitations:{type:Number},
  //   weddingStationery:{type:Number}
  //   // other:{type:Number}
  // },
  invitationSpeciality:[String],
  shipInvities:[String]
  // shipInvities :{
  //   noShipping:{type:Number},
  //   domesticShipping:{type:Number},
  //   internationalShipping:{type:Number}
  // }

},{_id: false, toJSON: { getters: true }});

module.exports = WeddingInvitationSchema;
