var mongoose = require('mongoose');
var VenueSchema = require('./category/Venue');
var BridalDesignerSchema = require('./category/BridalDesigner');
var BridalMakeupArtistSchema = require('./category/BridalMakeupArtist');
var ChoreographerSchema = require('./category/Choreographer');
var MehndiArtistSchema = require('./category/MehndiArtist');
var PhotographerSchema = require('./category/Photographer');
var WeddingDecoratorSchema = require('./category/WeddingDecorator');
var WeddingInvitationSchema = require('./category/WeddingInvitation');
var WeddingPlannerSchema = require('./category/WeddingPlanner');
var BandBajaGhodiwalaSchema = require('./category/BandBajaGhodiwala');
var TravelHoneymoonSchema = require('./category/TravelHoneymoon');
var PriestPanditSchema = require('./category/PriestPandit');
var CatererSchema = require('./category/Caterer');
jwt = require('jsonwebtoken'),
    crypto = require('crypto');

var VendorSchema = new mongoose.Schema({
    brandname: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    providerUserID: { type: String, default: 'xxx' },
    password: { type: String , default: '123456'},
    logtype: { type: Number, default: 0 },
    introduction: { type: String },
    workingSince: { type: Number },
    noWeddingCovered: { type: Boolean }, //???
    websiteUrl: { type: String },
    facebookPageLink: { type: String },
    instagramPageLink: { type: String },
    contactPersonName: { type: String },
    anotherNumber: { type: String },
    businessAddress: { type: String },
    businessCity: { type: String },
    area: { type: String },
    pincode: { type: String },
    pastworkPhotos: [String],
    pastworkVideos: [String],
    mainImg: { type: String },
    membership: { type: Number, default: 0 },
    advanceForBooking: { type: Number, default: 0 },
    paymentOnEventDate: { type: Number , default: 0},
    paymentOnDelivery: { type: Number, default: 0 },
    cancellationPolicy: { type: String },
    chargeCancellation:{type:Number,default:0},
    trialPolicy: { type: String },
    reviewAvg: { type: Number, default: 0 },
    reviewNum: { type: Number, default: 0 },
    reviewCnt: { type: Number, default: 0 },
    hash: { type: String },
    salt: { type: String },
    status: { type: String },
    bannerStatus:{type:Boolean, default:false},
    verifyStatus: {
        phoneVerify: { type: Boolean, default: false },
        emailVerify: { type: Boolean, default: false },
        addressVerify: { type: Boolean, default: false },
    },
    isVendorVerified:{type:Boolean, default:false},
    basicStatus: {
        basicDetailsStatus: { type: Boolean, default: false },
        contactInfoStatus: { type: Boolean, default: false },
        servicePricingStatus: { type: Boolean, default: false },
    },
    createDate:{type:String},
    modifyDate:{type:String},
    createdBy:{type:String,default:'Sonali'},
    modifiedBy:{type:String,default:'Sonali'},
    submittedDate:{type:String},
    submittedBy:{type:String, default: 'Admin'},
    reviewedDate:{type:String},
    reviewedBy:{type:String},
}, { discriminatorKey: 'type', toJSON: { getters: true } });

VendorSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};


VendorSchema.methods.ValidPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

VendorSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jwt.sign({
            _id: this._id,
            logtype: this.logtype,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, // 1 Hour
        process.env.JWT_SECRET);
};
var VendorModel = mongoose.model('Vendor', VendorSchema);
const Venue = VendorModel.discriminator("Venue", new mongoose.Schema(VenueSchema));
const BridalDesigner = VendorModel.discriminator("BridalDesigner", new mongoose.Schema(BridalDesignerSchema));
const BridalMakeupArtist = VendorModel.discriminator("BridalMakeupArtist", new mongoose.Schema(BridalMakeupArtistSchema));
const Choreographer = VendorModel.discriminator("Choreographer", new mongoose.Schema(ChoreographerSchema));
const MehndiArtist = VendorModel.discriminator("MehndiArtist", new mongoose.Schema(MehndiArtistSchema));
const Photographer = VendorModel.discriminator("Photographer", new mongoose.Schema(PhotographerSchema));
const WeddingDecorator = VendorModel.discriminator("WeddingDecorator", new mongoose.Schema(WeddingDecoratorSchema));
const WeddingInvitation = VendorModel.discriminator("WeddingInvitation", new mongoose.Schema(WeddingInvitationSchema));
const WeddingPlanner = VendorModel.discriminator("WeddingPlanner", new mongoose.Schema(WeddingPlannerSchema));

const BandBajaGhodiwala = VendorModel.discriminator("BandBajaGhodiwala", new mongoose.Schema(BandBajaGhodiwalaSchema));
const TravelHoneymoon = VendorModel.discriminator("TravelHoneymoon", new mongoose.Schema(TravelHoneymoonSchema));
const PriestPandit = VendorModel.discriminator("PriestPandit", new mongoose.Schema(PriestPanditSchema));
const Caterer = VendorModel.discriminator("Caterer", new mongoose.Schema(CatererSchema));

// module.exports = mongoose.model('Vendor', VendorSchema);
module.exports = VendorModel;
module.exports = Venue;
module.exports = BridalDesigner;
module.exports = BridalMakeupArtist;
module.exports = MehndiArtist;
module.exports = Choreographer;
module.exports = Photographer;
module.exports = WeddingDecorator;
module.exports = WeddingInvitation;
module.exports = WeddingPlanner;
module.exports = BandBajaGhodiwala;
module.exports = TravelHoneymoon;
module.exports = PriestPandit;
module.exports = Caterer;