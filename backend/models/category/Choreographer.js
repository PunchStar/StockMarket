var mongoose = require('mongoose');

var ChoreographerSchema = new mongoose.Schema({
  startingPrice:{type:Number},
  costPer:{type:Boolean},
  startingPriceInclude:{type:String},
  favouriteMusicGenres:[{type:String}],
  // otherWorkLocation: [{ type: String }],
  // travelOtherIndianCities : {type:Boolean},
  // travelCost: { type: Number },  packagePricing : { type:Number},
  // provideBackupDancers :{type:Boolean},
  regularlyPlayClub:{type:String},
  experiencedHave:{type:String},
  popularWorkAward:{type:String}
},{_id: false, toJSON: { getters: true }});

module.exports = ChoreographerSchema;
