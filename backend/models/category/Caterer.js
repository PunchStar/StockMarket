var mongoose = require('mongoose');

var CatererSchema = new mongoose.Schema({

  startingPrice:{type:Number},
  costPer:{type:Boolean},
  perDayRentPrice:{type:Number,default:0},
  perVegPlatePrice:{type:Number,default:0},
  perNonVegPlatePrice:{type:Number,default:0},
  minNumberCater:{type:Number},
  standardVegInclude:{type:String},
  speciality:{type:String},
  cuisinesOffered:[{type:String}],
  catererType:{type:String} ,
  catererContent:{type:String}
},{_id: false, toJSON: { getters: true }});

module.exports = CatererSchema;
