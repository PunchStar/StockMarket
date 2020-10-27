var mongoose = require('mongoose');
const Payment = mongoose.model('Payment');
exports.create = (req, res) => {
    // console.log('asdasdasdd')
    Payment.findOne({ date: '' }).then(user => {
        if (user) {
            return res.status(400).json({ reviewName: "payment already exists" });
        } else {
            const user = new Payment(req.body);
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
    Payment.find({}).populate('authorId').exec(function(err, blogs) {
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
    Payment.find(query).populate('vendorId').exec(function(err, blogs) {
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
exports.paymentDetail = (req, res) => {
    Payment.find({ 'vendorId': req.body.id }, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {

            res.json(vendor);
        }
    }).populate('clientId');
};
exports.getAllPayment = (req, res) => {
    Payment.find({}, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {

            res.json(vendor);
        }
    }).populate(['clientId', 'vendorId']);
};
exports.checkout = (req, res) => {
    console.log('checkout')
        // const checkoutInfo = req.body;
        // console.log(checkoutInfo);

    const stripe = require("stripe")(
        "sk_test_OJvo9v9hnM2EgTCcfzBh2skZ006DjFJIEw"
    );

    // let name = checkoutInfo[1];
    // let address = checkoutInfo[2]
    // let amount = 0 + checkoutInfo[0] * 100;
    // let source = "tok_amex";
    // let source = checkoutiInfo[3];
    var name = req.body.name;
    var address = req.body.address;
    var amount = 0 + req.body.amount * 100;
    var source = JSON.parse(req.body.source);

    console.log("Name: ", name);
    console.log("Amount: ", amount);
    console.log("The source: ", source);

    stripe.charges.create({
        amount: amount,
        currency: "inr",
        // currency: "usd",
        source: source.id, // obtained with Stripe.js
        description: "Charge for " + name + "@example.com"
    }, function(err, charge) {
        // asynchronously called
        if (err) {
            console.log(err)

        } else if (charge) {
            console.log(charge)
                // res.status(200).json(charge);
            console.log('============= payment =======')
            Payment.findOne({ tokenId: source.id }).then(user => {
                if (user) {
                    console.log('============= user =======')
                    return res.status(400).json({ reviewName: "payment already exists" });
                } else {
                    console.log('============= charge =======')
                    const user = new Payment(req.body);
                    user.date = Date.now();
                    if (req.body.clientIdT == '')
                        user.fromTo = 1;
                    else
                        user.clientId = req.body.clientIdT;
                    user.vendorId = req.body.vendorId;
                    user.content = name;
                    user.tokenId = source.id;
                    user.amount = amount;
                    user.save((err) => {
                        if (err) {
                            console.log('============= error =======')
                            console.log(err)
                            res.status(500).json(err);
                        } else {
                            console.log('============= 2000 =======')
                            res.status(200).json("Registered successfully");
                        }
                    });
                }
            });
            // Payment.findOne({ tokenId: source.id }, (err, payment) => {
            //     if (err) {
            //         console.log(err)
            //         res.status(401).json(err)
            //     }
            //     if (payment) {
            //         res.status(401).json("Payment exisited")
            //     } else {
            //         console.log('============= payment =======')
            //         console.log(charge)
            //         console.log('...................')
            //         const payment1 = new Payment(req.body);
            //         payment1.date = Date.now();
            //         if (req.body.fromTo)
            //             payment1.fromTo = 1;
            //         payment1.content = name;
            //         payment1.tokenId = source.id;
            //         payment1.amount = amount;
            //         console.log(payment1)
            //         payment1.save((err) => {
            //             if (err) {
            //                 res.status(500).json(err);
            //             } else {
            //                 res.status(200).json("Registered successfully");
            //             }
            //         });
            //         res.status(200).json(payment);
            //     }
            // })
        }
    });

    // CartItem.remove({}, function(err) {
    //     console.log('collection removed')
    // });

}