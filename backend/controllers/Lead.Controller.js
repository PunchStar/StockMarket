var mongoose = require('mongoose');
const Lead = mongoose.model('Lead');
exports.create = (req, res) => {
    // console.log('sdlfjlsdjflksd')
    console.log(req.body)
    Lead.findOne({ fullName: '' }).then(user => {
        if (user) {
            return res.status(400).json({ useranme: "user already exists" });
        } else {
            const user = new Lead(req.body);
            // user.setPassword(req.body.hash);
            user.save((err) => {
                if (err) {
                    console.log(err) 
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
    Lead.find({ 'vendorId': req.body.id }, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendor);
        }
    })
};
exports.findAllClient = (req, res) => {
    // console.log('type');
    // console.log('findall')
    // console.log(req.body.id)
    Lead.find({ 'clientEmail': req.body.email }, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendor);
        }
    })
};
exports.getClient = (req, res) => {
    console.log('getclient')
    Lead.find({ 'clientEmail': req.body.email }, function(err, vendor) {
        if (err) {
            console.log(err)
        } else {
            res.json(vendor)
        }
    }).populate('vendorId')
}

exports.setStatusLeadsVendor = (req, res) => {
    Lead.findOne({ clientEmail: req.body.email, eventDate: req.body.date }).then(user => {
        if (user) {
            if (user.leadStatus == 'allow')
                user.leadStatus = 'pending'
            else
                user.leadStatus = 'allow'
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
    Lead.findOneAndRemove({ clientEmail: req.body.email, eventDate: req.body.date }, function(err, business) {
        if (err) res.status(401).json(err);
        else res.status(200).json('Successfully removed');
    });
}
exports.delLeadVendorId = (req, res) => {
    Lead.findOneAndRemove({ vendorId: req.body.id }, function(err, business) {
        if (err) res.status(401).json(err);
        else res.status(200).json('Successfully removed');
    });
}