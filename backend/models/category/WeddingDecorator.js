var mongoose = require('mongoose');

var WeddingDecoratorSchema = new mongoose.Schema({

  // otherWorkLocation: [{ type: String }],
  // onPanelOfVenue : {type:String},
  startingPrice:{type:Number},  
  indoorDecorStartingPrice:{type:Number},
  outdoorDecorStartingPrice:{type:Number},
  // chooseCoreSpecialities:{
  //   flowers:{type:Number},
  //   bannerPrints:{type:Number},
  //   audioVisuals:{type:Number},
  //   decorativeDraping:{type:Number},
  //   eventConcertDesign:{type:Number},
  //   lighting:{type:Number},
  //   sounds:{type:Number},
  //   furnitureRental:{type:Number},
  //   mandap:{type:Number},
  //   carDecoration:{type:Number},
  //   fireworks:{type:Number},
  //   tents:{type:Number},
  //   giftWrapping:{type:Number},
  //   homeDecoration:{type:Number},
  //   centerpiece:{type:Number},
  //   tableDecoration:{type:Number},
  //   entrances:{type:Number},
  //   others:{type:Number}
  // },//modal
    chooseCoreSpecialities:[{type:String}],
  otherServices:{type:String},  
  // brandsUsed:{type:String}
  decorProvidedFor:{type:String}

},{_id: false, toJSON: { getters: true }});

module.exports = WeddingDecoratorSchema;
