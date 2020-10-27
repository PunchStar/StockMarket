var mongoose = require('mongoose'),
    passport = require('passport');
const WeddingDecorator = mongoose.model('WeddingDecorator');

exports.create = (req, res) => {
    // var role = req.type;
    // const car = new Car(req.body);
    WeddingDecorator.findOne({ email: req.body.email }).then(bridal => {
        if (bridal) {
            return res.status(400).json({ email: 'WeddingDecorator already exists' });
        } else {
            const bridal = new WeddingDecorator(req.body);
            if(!req.body.createDate)
            bridal.createDate = new Date().toString().slice(0,10);
            bridal.setPassword(req.body.hash);
            bridal.status = 'false';
            bridal.save((err) => {
                if (err) {
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
    WeddingDecorator.findById(userId, function(err, car) {
        Object.assign(car, req.body);
        if(!req.body.modifyDate)
        car.modifyDate = new Date().toString().slice(0,10);
        if (req.body.basicDetailsStatus)
            car.basicStatus.basicDetailsStatus = req.body.basicDetailsStatus;
        if (req.body.contactInfoStatus)
            car.basicStatus.contactInfoStatus = req.body.contactInfoStatus;
        if (req.body.servicePricingStatus)
            car.basicStatus.servicePricingStatus = req.body.servicePricingStatus;
        if (req.body.flowers)
            car.chooseCoreSpecialities.flowers = req.body.flowers
        if (req.body.bannerPrints)
            car.chooseCoreSpecialities.bannerPrints = req.body.bannerPrints
        if (req.body.audioVisuals)
            car.chooseCoreSpecialities.audioVisuals = req.body.audioVisuals
        if (req.body.decorativeDraping)
            car.chooseCoreSpecialities.decorativeDraping = req.body.decorativeDraping
        if (req.body.eventConcertDesign)
            car.chooseCoreSpecialities.eventConcertDesign = req.body.eventConcertDesign
        if (req.body.lighting)
            car.chooseCoreSpecialities.lighting = req.body.lighting
        if (req.body.sounds)
            car.chooseCoreSpecialities.sounds = req.body.sounds
        if (req.body.furnitureRental)
            car.chooseCoreSpecialities.furnitureRental = req.body.furnitureRental
        if (req.body.mandap)
            car.chooseCoreSpecialities.mandap = req.body.mandap
        if (req.body.carDecoration)
            car.chooseCoreSpecialities.carDecoration = req.body.carDecoration
        if (req.body.fireworks)
            car.chooseCoreSpecialities.fireworks = req.body.fireworks
        if (req.body.tents)
            car.chooseCoreSpecialities.tents = req.body.tents
        if (req.body.giftWrapping)
            car.chooseCoreSpecialities.giftWrapping = req.body.giftWrapping
        if (req.body.homeDecoration)
            car.chooseCoreSpecialities.homeDecoration = req.body.homeDecoration
        if (req.body.centerpiece)
            car.chooseCoreSpecialities.centerpiece = req.body.centerpiece
        if (req.body.tableDecoration)
            car.chooseCoreSpecialities.tableDecoration = req.body.tableDecoration
        if (req.body.entrances)
            car.chooseCoreSpecialities.entrances = req.body.entrances

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