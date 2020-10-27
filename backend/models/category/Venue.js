var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
    propertyType: { type: String },
    chargeWay: { type: String },
    areaVenue:[
        {
            nameOfArea: { type: String },
            typeOfArea: { type: String },
            floatingCapacity: { type: Number },
            fixedCapacity: { type: Number },
        }
    ],
    maxmiumGuests:{type:Number},
    // nameOfArea: { type: String },
    // typeOfArea: { type: String },
    // floatingCapacity: { type: Number },
    // fixedCapacity: { type: Number },
    roomsAvaliable: { type: Boolean },
    noRooms: { type: Number },
    foodPolicy: {
        inhouseCaterAvailable: { type: Boolean, default:false  },
        outsideCatererAllowed: { type: Boolean , default:false},
    },
    decorationPolicy: {
        fixedDecorationAvailable: { type: Boolean },
        decoratorsOnPanel: { type: Boolean },
        outsideDecoratorAllowed: { type: Boolean },
    },
    DJPolicy: { 
        inHouseDJAvailable: { type: Boolean ,default:false},
        outsideAllowed: { type: Boolean ,default:false},
    },
    alcoholPolicy: {
        inHouseAlcoholAvailable:{ type: Boolean,default:false },
        outsideAllowed: { type: Boolean,default:false }
    },
    additionalFacilities: {
        electricityBackup: { type: Boolean },
        airConditioned: { type: Boolean },
        restaurant: { type: Boolean },
        bar: { type: Boolean },
        conferenceCenter: { type: Boolean },
        wifi: { type: Boolean },
        spa: { type: Boolean },
        valletParking: { type: Boolean },
        bridalRoom: { type: Boolean },
        airportPickupDrop: { type: Boolean },
        conciergeServices: { type: Boolean },
        pool: { type: Boolean },
        parking: { type: Boolean },
    },
    parkingFacility: { type: Boolean },
    noCarParked:{type:Number},
    
    costPer:{type:Boolean},
    perDayRentPrice:{type:Number,default:0},
    perVegPlatePrice:{type:Number,default:0},
    perNonVegPlatePrice:{type:Number,default:0},
}, { _id: false, toJSON: { getters: true } });

module.exports = VenueSchema;