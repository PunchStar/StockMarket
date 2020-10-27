var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  type: {type:mongoose.Schema.Types.ObjectId, ref:'Blogcategory'}, 
  topic:{type:String, required:true},
  mainImg:{type:String},
  mainContent:{type:String},
  mainCaptain:{type:String},
  mainLink:{type:String},
  blogTag:[{display:{type:String},value:{type:String}}],
  viewCount:{type:Number,default:5},
  subParts:[{
    subContent:{type:String},
    subTopic:{type:String},
    subCaptain:{type:String},
    subImg:{type:String},
    subLink:{type:String}
  }],
  authorId:{type:mongoose.Schema.Types.ObjectId, ref:'Client'},
  createDate:{type:String},
  modifyDate:{type:String},
  createdBy:{type:String,default:'Sonali'},
  modifiedBy:{type:String,default:'Sonali'}
}, { toJSON: { getters: true }} );
module.exports = mongoose.model('Blog', BlogSchema);
