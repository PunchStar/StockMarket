var mongoose = require('mongoose'),
    passport = require('passport');
const Photographer = mongoose.model('Photographer');

exports.create = (req, res) => {
    // var role = req.type;
    // const car = new Car(req.body);
    Photographer.findOne({ email: req.body.email }).then(bridal => {
        if (bridal) {
            return res.status(400).json({ email: 'Photographer already exists' });
        } else {
            const bridal = new Photographer(req.body);
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
    console.log('>>>>>>>>>  phtogoraphy <<<<<<<')
    console.log(req.body)
    userId = req.userId;
    Photographer.findById(userId, function(err, car) {
        Object.assign(car, req.body);
        if(!req.body.modifyDate)
        car.modifyDate = new Date().toString().slice(0,10);
        if (req.body.basicDetailsStatus)
            car.basicStatus.basicDetailsStatus = req.body.basicDetailsStatus;
        if (req.body.contactInfoStatus)
            car.basicStatus.contactInfoStatus = req.body.contactInfoStatus;
        if (req.body.servicePricingStatus)
            car.basicStatus.servicePricingStatus = req.body.servicePricingStatus;

        car.travelOtherIndianCities = req.body.travelOtherIndianCities == '' ? false : true;
        car.serviceOffered.candidPhotography = req.body.candidPhotography,
            car.serviceOffered.traditionalPhotography = req.body.traditionalPhotography,
            car.serviceOffered.cinematicVideo = req.body.cinematicVideo,
            car.serviceOffered.traditionalVideo = req.body.traditionalVideo,
            car.serviceOffered.photoAlbum = req.body.photoAlbum,
            car.serviceOffered.preWeddingShoot = req.body.preWeddingShoot,
            car.serviceOffered.drone = req.body.drone,
            car.serviceOffered.crane = req.body.crane,
            car.serviceOffered.photobooth = req.body.photobooth
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