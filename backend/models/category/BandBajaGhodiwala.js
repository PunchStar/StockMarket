var mongoose = require('mongoose');
// Band Baja/Ghodiwala bandBajaGhodiwala
var BandBajaGhodiwalaSchema = new mongoose.Schema({
  startingPackagePrice:{type:Number},
  packageIncluded:{
      noHours:{type:Number},
      brassBand:{type:Boolean},
      transportationChargesIncluded:{type:Boolean},
      packageInfo:{type:String}
  },
  experiencedHave:{type:String},
  baseLocationWhereBusinessLocated:{type:String},
  wilingToTravel:{type:Boolean},
  readyToTravelKM:{type:Number},
  travelCost:{type:String}
}, { _id: false, toJSON: { getters: true } });

module.exports = BandBajaGhodiwalaSchema;