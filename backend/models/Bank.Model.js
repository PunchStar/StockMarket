var mongoose = require('mongoose');

var BankSchema = new mongoose.Schema({
    topic:{type:String},
    id:{type:Number},
    type:{type:String},
    date:{type:Date},
    ISIN: { type: String },
    Issuer: { type: String },
    IssueVolume: { type: Number },
    Currency: { type: String ,default:'GBP'},
    IssuePrice: { type:Number,default:100 },
    IssueDate: { type: Date },
    Coupon: { type:Number,default:6.00 },
    Denomination: { type: Number },
    PaymentType: { type: String },
    SpecialCouponType: [{ type: String }],
    MaturityDate:   { type: Date},
    CouponPaymentDate:{ type: String },
    NoofPaymentsperYear:[{ type: Number }],
    CouponStartDate: { type: Date },
    FinalCouponDate: { type: Date },
    Floater: { type: String, default:'No' },
    uploadUrl: {type:String}
}, { toJSON: { getters: true } });


module.exports = mongoose.model('Bank', BankSchema);