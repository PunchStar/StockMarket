var mongoose = require('mongoose');
// PriestPandit
var PriestPanditSchema = new mongoose.Schema({
  startingPrice:{type:Number},
  serviceOffered:{
    preWeddingRokaPujaHawan:{type:String},
    saganPujaHawan:{type:String},
    weddingPujaHawan:{type:String},
    matchingKundlis:{type:String},
    astrology:{type:String},
  },
  samagriIncluded:{type:Boolean},
  languagesKnow:[{type:String}],
  experiencedHave:{type:String},
  serviceArea:{type:String}
}, { _id: false, toJSON: { getters: true } });

module.exports = PriestPanditSchema;