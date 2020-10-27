var mongoose = require('mongoose'),
    passport = require('passport');
const TravelHoneymoon = mongoose.model('TravelHoneymoon');

exports.create = (req, res) => {
    // var role = req.type;
    // const car = new Car(req.body);
    TravelHoneymoon.findOne({ email: req.body.email }).then(bridal => {
        if (bridal) {
            return res.status(400).json({ email: 'bridal designer already exists' });
        } else {
            const bridal = new TravelHoneymoon(req.body);
            if(!req.body.createDate)
                bridal.createDate = new Date().toString().slice(0,10);
            bridal.setPassword(req.body.hash);
            bridal.status = 'false';
            bridal.save((err) => {
                if (err) {
                    res.status(200).json(err);
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
    TravelHoneymoon.findById(userId, function(err, car) {
        Object.assign(car, req.body);
        if(!req.body.modifyDate)
        car.modifyDate = new Date().toString().slice(0,10);
        // if (req.body.basicDetailsStatus)
        //     car.basicStatus.basicDetailsStatus = req.body.basicDetailsStatus;
        // if (req.body.contactInfoStatus)
        //     car.basicStatus.contactInfoStatus = req.body.contactInfoStatus;
        // if (req.body.servicePricingStatus)
        //     car.basicStatus.servicePricingStatus = req.body.servicePricingStatus;

        // if (req.body.readyToPurchaseOutfits)
        //     car.speciality.readyToPurchaseOutfits = req.body.readyToPurchaseOutfits
        // if (req.body.samplePiecesOnOrders)
        //     car.speciality.samplePiecesOnOrders = req.body.samplePiecesOnOrders
        // if (req.body.designedOutfitsFromScratch)
        //     car.speciality.designedOutfitsFromScratch = req.body.designedOutfitsFromScratch
        // if (req.body.bridalLehengas)
        //     car.outfitsOffer.bridalLehengas = req.body.bridalLehengas
        // if (req.body.lightLehengas)
        //     car.outfitsOffer.lightLehengas = req.body.lightLehengas
        // if (req.body.growns)
        //     car.outfitsOffer.growns = req.body.growns
        // if (req.body.anarkalisSuits)
        //     car.outfitsOffer.anarkalisSuits = req.body.anarkalisSuits
        // if (req.body.sareers)
        //     car.outfitsOffer.sareers = req.body.sareers
        // if (req.body.indoWestern)
        //     car.outfitsOffer.indoWestern = req.body.indoWestern
        car.save((err) => {
            if (err) {
                res.status(404).json(err);
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