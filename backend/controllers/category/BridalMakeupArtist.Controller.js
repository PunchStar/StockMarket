var mongoose = require('mongoose'),
    passport = require('passport');
const BridalMakeupArtist = mongoose.model('BridalMakeupArtist');

exports.create = (req, res) => {
    // var role = req.type;
    // const car = new Car(req.body);
    BridalMakeupArtist.findOne({ email: req.body.email }).then(bridal => {
        if (bridal) {
            return res.status(400).json({ email: 'BridalMakeupArtist already exists' });
        } else {
            const bridal = new BridalMakeupArtist(req.body);
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
    BridalMakeupArtist.findById(userId, function(err, car) {
        Object.assign(car, req.body);
        if(!req.body.modifyDate)
        car.modifyDate = new Date().toString().slice(0,10);
        if (req.body.basicDetailsStatus)
            car.basicStatus.basicDetailsStatus = req.body.basicDetailsStatus;
        if (req.body.contactInfoStatus)
            car.basicStatus.contactInfoStatus = req.body.contactInfoStatus;
        if (req.body.servicePricingStatus)
            car.basicStatus.servicePricingStatus = req.body.servicePricingStatus;

        car.haveStudio = req.body.haveStudio == '' ? false : true;
        car.travelToClientVenue = req.body.travelToClientVenue == '' ? false : true;
        car.travelCost = req.body.travelCost == '' ? 'Not to be paid by client' : 'To be paid by client';
        if (req.body.regularMakeup)
            car.serviceOffered.regularMakeup = req.body.regularMakeup;
        if (req.body.guestMakeup)
            car.serviceOffered.guestMakeup = req.body.guestMakeup;
        if (req.body.nailPaint)
            car.serviceOffered.nailPaint = req.body.nailPaint;
        if (req.body.draping)
            car.serviceOffered.draping = req.body.draping;
        if (req.body.mehendi)
            car.serviceOffered.mehendi = req.body.mehendi;
        if (req.body.jewellery)
            car.serviceOffered.jewellery = req.body.jewellery;
        if (req.body.airbrushMakeup)
            car.serviceOffered.airbrushMakeup = req.body.airbrushMakeup;

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