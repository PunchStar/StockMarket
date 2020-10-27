var mongoose = require('mongoose');

var PhotographerSchema = new mongoose.Schema({
    otherWorkLocation: [{ type: String }],
    startingPrice:{type:Number},
    travelOtherIndianCities: { type: Boolean },
    travelCost: { type: String },
    serviceOffered: {
        candidPhotography: { type: Number },
        traditionalPhotography: { type: Number },
        cinematicVideo: { type: Number },
        traditionalVideo: { type: Number },
        photoAlbum: { type: Number },
        preWeddingShoot: { type: Number },
        drone: { type: Number },
        crane: { type: Number },
        photobooth: { type: Number }
    }

}, { _id: false, toJSON: { getters: true } });

module.exports = PhotographerSchema;