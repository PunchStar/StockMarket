var mongoose = require('mongoose');
jwt = require('jsonwebtoken'),
crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    id:{ type: Number,required: true,},
    accountType : { type: String,default:'Individual Account'},
    companyDirector :{ type: String,default:''},
    natureBusiness : { type: String,default:''},
    nameCompany : { type: String,default:''},
    accessToken: { type: String},
    refreshToken: { type: String},
    firstName: { type: String,default:''},
    lastName: { type: String,default:''},
    firstNameTwo: { type: String,default:''},
    lastNameTwo: { type: String,default:''},
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    providerUserID: { type: String, default: 'xxx' },
    countryCitizenship:{type:String},
    countryResidence:{type:String},
    uploadFiles:{type:String},
    addFileds:[{type:String}],
    addField1:{type:String},
    addField2:{type:String},
    addField3:{type:String},
    addField4:{type:String},
    password: {
        type: String,default:'123456'
    },
    logtype: {
        type: Number,
        default: 0
    },
    hash: { type: String },
    salt: { type: String },
    status:{type:String,default:'Pending'},
    // verifyStatus: {
    //     phoneVerify: { type: Boolean, default: false },
    //     emailVerify: { type: Boolean, default: false },
    //     addressVerify: { type: Boolean, default: false },
    // },
    userType:{type:Number, default:0},
    roles:[{type:Number, default:2}],
    totalEquity:{type:Number, default:0},
    userStatus:{type:String, default:'Unverified'},
    date:{type:Date,default:new Date()},
    modifyDate:{type:String},

    employmentStatus:{type:String, default:'Other'},
    nameEmployer:{type:String,default:''},
    nameCompanyEm:{type:String, default:''},
    investmentKnowledge:{type:String, default:'Beginner'},
    netWorth:{type:String, default:'£25,000 - £50,000'}
}, { toJSON: { getters: true } });

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};


UserSchema.methods.ValidPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jwt.sign({
            _id: this._id,
            firstName: this.firstName,
            logtype: this.logtype,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, // 1 Hour
        process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', UserSchema);