var mongoose = require('mongoose');
jwt = require('jsonwebtoken'),
    crypto = require('crypto');

var OwnerSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    hash: { type: String },
    salt: { type: String }
}, { toJSON: { getters: true } });

OwnerSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};


OwnerSchema.methods.ValidPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

OwnerSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jwt.sign({
            _id: this._id,
            user: this.user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, // 1 Hour
        process.env.JWT_SECRET);
};

module.exports = mongoose.model('Owner', OwnerSchema);