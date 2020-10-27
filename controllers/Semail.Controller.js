var mongoose = require('mongoose'),
    passport = require('passport');
const Semail = mongoose.model('Semail');

exports.register = (req, res) => {
    Semail.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ useranme: "email already exists" });
        } else {
            const user = new Semail();
            user.email = req.body.email;
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
