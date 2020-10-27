var mongoose = require('mongoose');
const Review = mongoose.model('Review');
exports.create = (req, res) => {
    console.log('asdasdasdd')
    Review.findOne({ reviewName: '' }).then(user => {
        if (user) {
            return res.status(400).json({ reviewName: "review already exists" });
        } else {
            const user = new Review(req.body);
            user.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json("Registered successfully");
                }
            });
        }
    });
};

exports.update = (req, res) => {
    console.log('type');

};
exports.findAll = (req, res) => {
    // console.log('type');
    console.log('findall')
    console.log(req.body.id)
    Review.find({ 'vendorId': req.body.id }, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendor);
        }
    })
};
exports.findAllVendor = (req, res) => {
    // console.log('type');
    console.log('findallVendor')
    Review.find({}, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendor);
        }
    }).populate('vendorId')
};
exports.delReview = (req, res) => {
    Review.findOneAndRemove(req.body, function(err, review) {
        if (err) {
            console.log(err)
            res.status(401).json(err);
        } else {
            res.status(200).json('successfull removed')
        }
    })
}