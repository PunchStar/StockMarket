var mongoose = require('mongoose'),
    passport = require('passport');
const Venue = mongoose.model('Venue');

exports.create = (req, res) => {
    // var role = req.type;
    // const car = new Car(req.body);
    Venue.findOne({ email: req.body.email }).then(bridal => {
        if (bridal) {
            return res.status(400).json({ email: 'Venue already exists' });
        } else {
            const bridal = new Venue(req.body);
            if(!req.body.createDate)
            bridal.createDate = new Date().toString().slice(0,10);
            bridal.setPassword(req.body.hash);
            bridal.status = 'false';
            bridal.save((err) => {
                if (err) {
                    console.log(err)
                    res.status(401).json(err);
                } else {
                    res.status(200).json({ result: 'successfully created!' });
                }
            });
        }
    })
};

exports.update = (req, res) => {
    // role = req.type;
    userId = req.userId;
    Venue.findById(userId, function(err, car) {
        Object.assign(car, req.body);
        if(!req.body.modifyDate)
        car.modifyDate = new Date().toString().slice(0,10);
        if (req.body.basicDetailsStatus)
            car.basicStatus.basicDetailsStatus = req.body.basicDetailsStatus;
        if (req.body.contactInfoStatus)
            car.basicStatus.contactInfoStatus = req.body.contactInfoStatus;
        if (req.body.servicePricingStatus)
            car.basicStatus.servicePricingStatus = req.body.servicePricingStatus;
            car.foodPolicy.inhouseCaterAvailable = req.body.inhouseCaterAvailable == '' ? false : true;
            car.foodPolicy.outsideCatererAllowed = req.body.outsideCatererAllowed == '' ? false : true;
            car.decorationPolicy.fixedDecorationAvailable = req.body.fixedDecorationAvailable == '' ? false : true;
            car.decorationPolicy.decoratorsOnPanel = req.body.decoratorsOnPanel == '' ? false : true;
            car.decorationPolicy.outsideDecoratorAllowed = req.body.outsideDecoratorAllowed == '' ? false : true;
            car.additionalFacilities.airConditioned = req.body.airConditioned == '' ? false : true;
            car.additionalFacilities.bar = req.body.bar == '' ? false : true;
            car.additionalFacilities.conferenceCenter = req.body.conferenceCenter == '' ? false : true;
            car.additionalFacilities.wifi = req.body.wifi == '' ? false : true;
            car.additionalFacilities.spa = req.body.spa == '' ? false : true;
            car.additionalFacilities.valletParking = req.body.valletParking == '' ? false : true;
            car.additionalFacilities.bridalRoom = req.body.bridalRoom == '' ? false : true;
            car.additionalFacilities.airportPickupDrop = req.body.airportPickupDrop == '' ? false : true;
            car.additionalFacilities.conciergeServices = req.body.conciergeServices == '' ? false : true;
            car.additionalFacilities.pool = req.body.pool == '' ? false : true;
            car.additionalFacilities.parking = req.body.parking == '' ? false : true;
        // if(req.body.inHouseAlcoholAvailable){
            car.alcoholPolicy.outsideAllowed = req.body.outsideAlcoholAllowed == '' ? false : true;
            car.alcoholPolicy.inHouseAlcoholAvailable = req.body.inHouseAlcoholAvailable == '' ? false : true;
            car.DJPolicy.outsideAllowed  = req.body.outsideDJAllowed == '' ? false : true;
            car.DJPolicy.inHouseDJAvailable =req.body.inHouseDJAvailable == '' ? false : true;
             car.DJPolicy.inHouseDJAvailable =req.body.inHouseDJAvailable == '' ? false : true;
        // }
        if(req.body.roomsAvaliable)
            car.roomsAvaliable = req.body.roomsAvaliable == '' ? false : true;
        console.log('?>>>>>>>>>>>>>>>>.')
            console.log(req.body.nameOfArea)
        console.log('?>>>>>>>>>>>>>>>>.')
            if(req.body.nameOfArea){
            var tempName = JSON.parse(req.body.nameOfArea)
            var tempType = JSON.parse(req.body.typeOfArea)
            var tempFloat = JSON.parse(req.body.floatingCapacity)
            var tempFix = JSON.parse(req.body.fixedCapacity)
            car.areaVenue = [];
            for(let i = 0; i < tempName.length; i ++)
            car.areaVenue.push({
                nameOfArea:tempName[i],
                typeOfArea:tempType[i],
                floatingCapacity:tempFloat[i],
                fixedCapacity:tempFix[i],
            })
        }
        car.save((err) => {
            if (err) {
                console.log(err)
                    // res.status(404).json(err);
            } else {
                res.status(200).json({ result: "successfully Updated!" });
            }
        });
    });
};

exports.delete = (req, res) => {
    // var role = req.type;
    // var userId = req.userId;
    // if(role == 0){
    //     Car.findByIdAndRemove({_id: req.params.id}, function(err, business){
    //         if(err) res.json(err);
    //         else res.json('Successfully removed');
    //     });
    // }
    // else if(role == 2){
    //     Car.findById(req.params.id, function(err, car) {
    //         if (userId == car.owner){
    //             Car.findByIdAndRemove({_id: req.params.id}, function(err, business){
    //                 if(err) res.json(err);
    //                 else res.json('Successfully removed');
    //             });
    //         }
    //         else{
    //             res.json('this model is not yours , so you cannot delete it')
    //         }
    //     });  
    // }
    // else{
    //     res.json('you are not admin, u are not allowed to delete it');
    // }

};