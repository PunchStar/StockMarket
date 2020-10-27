var mongoose = require('mongoose'),
    passport = require('passport');
const WeddingPlanner = mongoose.model('WeddingPlanner');

exports.create = (req, res) => {
    // var role = req.type;
    // const car = new Car(req.body);
    WeddingPlanner.findOne({ email: req.body.email }).then(bridal => {
        if (bridal) {
            return res.status(400).json({ email: 'WeddingPlanner already exists' });
        } else {
            const bridal = new WeddingPlanner(req.body);
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
    WeddingPlanner.findById(userId, function(err, car) {
        Object.assign(car, req.body);
        if(!req.body.modifyDate)
                car.modifyDate =new Date().toString().slice(0,10);
        if (req.body.basicDetailsStatus)
            car.basicStatus.basicDetailsStatus = req.body.basicDetailsStatus;
        if (req.body.contactInfoStatus)
            car.basicStatus.contactInfoStatus = req.body.contactInfoStatus;
        if (req.body.servicePricingStatus)
            car.basicStatus.servicePricingStatus = req.body.servicePricingStatus;

        if (req.body.trousseauPreperations)
            car.serviceOffered.trousseauPreperations = req.body.trousseauPreperations
        if (req.body.DJMusic)
            car.serviceOffered.DJMusic = req.body.DJMusic
        if (req.body.venueBooking)
            car.serviceOffered.venueBooking = req.body.venueBooking
        if (req.body.decor)
            car.serviceOffered.decor = req.body.decor
        if (req.body.photographyServices)
            car.serviceOffered.photographyServices = req.body.photographyServices
        if (req.body.honeymoon)
            car.serviceOffered.honeymoon = req.body.honeymoon
        if (req.body.serviceStaff)
            car.serviceOffered.serviceStaff = req.body.serviceStaff
        if (req.body.invitations)
            car.serviceOffered.invitations = req.body.invitations
        if (req.body.catering)
            car.serviceOffered.catering = req.body.catering
        if (req.body.PRMediaCoverage)
            car.serviceOffered.PRMediaCoverage = req.body.PRMediaCoverage
        if (req.body.gifts)
            car.serviceOffered.gifts = req.body.gifts
        if (req.body.celebrityInvites)
            car.serviceOffered.celebrityInvites = req.body.celebrityInvites

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