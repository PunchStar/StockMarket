var mongoose = require('mongoose');
const Favourite = mongoose.model('Favourite');
exports.create = (req, res) => {
    // console.log('asdasdasdd')
    Favourite.findOne({ date: '' }).then(user => {
        if (user) {
            return res.status(400).json({ reviewName: "payment already exists" });
        } else {
            const user = new Favourite(req.body);
            user.createDate = Date.now();
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
    Favourite.find({}).populate('authorId').exec(function(err, blogs) {
        if (err) {
            console.log(err)
        } else {
            // console.log('.. blogs ..')
            // console.log(blogs)
            // blogs.forEach((sub,index)=>{
            //     var temp = sub['createDate'].toString().slice('0, 10').split('-');
            //     blogs[index]['createDate'] = temp[1] + '/' + temp[2] + '/' + temp[0]
            // })
            // console.log(blogs)
            res.json(blogs)
        }
    })
}
exports.search = (req, res) => {
    var query = {};
    // Object.assign(query, { 'type': req.body.type });
    console.log(query)
    Favourite.find(query).populate('vendorId').exec(function(err, blogs) {
        if (err) {
            console.log(err)
        } else {
            console.log('.. blogs ..')
            console.log(blogs)
                // blogs.forEach((sub,index)=>{
                //     var temp = sub['createDate'].toString().slice('0, 10').split('-');
                //     blogs[index]['createDate'] = temp[1] + '/' + temp[2] + '/' + temp[0]
                // })
                // console.log(blogs)
            res.json(blogs)
        }
    })
}
exports.favouriteDetail = (req, res) => {
    console.log('====== favourite Detail ==========')
    console.log(req.body.id)
    console.log('====== favourite Detail ==========')

    Favourite.find({ 'clientId': req.body.id }, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {

            res.json(vendor);
        }
    }).populate('vendorId');
};
exports.favouriteDetails = (req, res) => {
    // User.findByIdAndRemove({_id: req.params.id}, function(err, business){
    //     if(err) res.json(err);
    //     else res.json('Successfully removed');
    // });
    Favourite.findOne({ 'clientId': req.body.id, 'vendorId': req.body.idVendor }).then(vendor => {
        if (vendor) {
            console.log(vendor)
            res.status(200).json("Existed Favourite");
        } else {
            const vendor = new Favourite({
                vendorId: req.body.idVendor,
                clientId: req.body.id,
                date: Date.now()
            });
            vendor.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json("Registered successfully");
                }
            });
        }
    });
};
exports.delFavourite = (req, res) => {
    console.log('----------- delfavourite -----------')
    Favourite.findOneAndRemove({ clientId: req.body.id, date: req.body.date }, function(err, favourite) {
        if (err) {
            console.log('err')
            console.log(err)
            res.json(err);
        } else {
            console.log('favourite')
            console.log(favourite)
            res.json('Successfully removed');
        }

    });
}