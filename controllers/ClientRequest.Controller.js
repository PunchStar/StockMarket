var mongoose = require('mongoose');
const ClientRequest = mongoose.model('ClientRequest');
exports.create = (req, res) => {
    // if (!req.body.username || !req.body.hash) {
    //     return res.status(400).json({message: "All fields required"});
    // }
    ClientRequest.findOne({ fullName: '' }).then(user => {
        if (user) {
            return res.status(400).json({ useranme: "user already exists" });
        } else {
            const user = new ClientRequest(req.body);
            // user.setPassword(req.body.hash);
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
    ClientRequest.findById(req.body._id).then(user => {
        if (user) {
            if(req.body.fullName)
                user.fullName = req.body.fullName;
            if(req.body.eventDate)
                user.eventDate = req.body.eventDate;
            if(req.body.eventCity)
                user.eventCity = req.body.eventCity;
            if(req.body.maxBudget)
                user.maxBudget = req.body.maxBudget;
            if(req.body.additionalContent)
                user.additionalContent = req.body.additionalContent;
            user.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json("Registered successfully");
                }
            });
        } else {
            return res.status(400).json({ useranme: "NONE" });
        }
    });
};
exports.findAll = (req, res) => {
    // console.log('type');
    console.log('findall')
    console.log(req.body.id)
    ClientRequest.find({ 'vendorId': req.body.id }, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {

            res.status(200).json(vendor);
        }
    })
};
exports.findAllClient = (req, res) => {
    // console.log('type');
    // console.log('findall')
    // console.log(req.body.id)
    ClientRequest.find({ 'clientEmail': req.body.email }, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(vendor);
        }
    }).populate('vendorId');
};
exports.setStatusLeadsVendor = (req, res) => {
    ClientRequest.findOne({ clientEmail: req.body.email, eventDate: req.body.date }).then(user => {
        if (user) {
            if (user.reqStatus == 'allow')
                user.reqStatus = 'false'
            else
                user.reqStatus = 'allow'
            user.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json("Registered successfully");
                }
            });
        } else {
            return res.status(400).json({ useranme: "NONE" });
            // const user = new Vendor(req.body);
            // if (user.status == 'allow')
            //     user.status = 'false'
            // else
            //     user.status = 'allow'
            // user.save((err) => {
            //     if (err) {
            //         res.status(500).json(err);
            //     } else {
            //         res.status(200).json("Registered successfully");
            //     }
            // });
        }
    });
}
exports.delLeadVendor = (req, res) => {
    ClientRequest.findOneAndRemove({ clientEmail: req.body.email, eventDate: req.body.date }, function(err, business) {
        if (err) res.status(401).json(err);
        else res.status(200).json('Successfully removed');
    });
}
exports.delLeadVendorId = (req, res) => {
    ClientRequest.findOneAndRemove({ vendorId: req.body.id }, function(err, business) {
        if (err) res.status(401).json(err);
        else res.status(200).json('Successfully removed');
    });
}