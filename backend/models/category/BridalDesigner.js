var mongoose = require('mongoose');

var BridalDesignerSchema = new mongoose.Schema({
  youRentFor:{
    brideWear:{type:Boolean},
    groomWear:{type:Boolean}
  },
  brideWearStartingPrice:{
    bridalLehengas:{type:Number,default:0},
    lightLehengas:{type:Number,default:0},
    gowns:{type:Number,default:0},
    trousseauSarees:{type:Number,default:0},
    trousseauAnarkalis:{type:Number,default:0},
    indoWestern:{type:Number,default:0},
    christianWeddingGowns:{type:Number,default:0},
  },
  groomWearStartingPrice:{
    sherwani:{type:Number,default:0},
    weddingSuitsTuxes :{type:Number,default:0},
    kurtaPyjama :{type:Number,default:0},
    bandhgala :{type:Number,default:0},
    waistCoatsNehruJackets :{type:Number,default:0},
    indoWestern:{type:Number,default:0},
    pagadi:{type:Number,default:0},
  },
  yourOutfits:{type:String},
  storeStudioStart:{type:String},
  descrieEstablishment:{type:String},
  outfitsPickupDropPolicy:{type:String}
  // chooseTypeOfStore : {type:String},
  // speciality : {
  //   readyToPurchaseOutfits:{type:Number},
  //   samplePiecesOnOrders:{type:Number},
  //   designedOutfitsFromScratch:{type:Number},
  // },
  // outfitsOffer :{
  //   bridalLehengas:{type:Number},
  //   lightLehengas:{type:Number},
  //   growns:{type:Number},
  //   anarkalisSuits:{type:Number},
  //   sareers:{type:Number},
  //   indoWestern:{type:Number}
  // }
},{_id: false, toJSON: { getters: true }});
module.exports = BridalDesignerSchema;
