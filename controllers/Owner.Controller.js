var mongoose = require('mongoose'),
    passport = require('passport');
const Owner = mongoose.model('Owner');
// exports.register = (req, res) => {
//     console.log('aaaa');
//     Owner.findOne({ user: req.body.user }).then(client => {
//         if (client) {
//             return res.status(400).json({ fullname: "client already exists" });
//         } else {
//             console.log('cccc');
//             const client = new Owner(req.body);
//             client.setPassword(req.body.hash);
//             client.save((err) => {
//                 if (err) {
//                     res.status(500).json(err);
//                 } else {
//                     console.log(client);
//                     const token = client.generateJwt();
//                     res.status(200).json("Registered successfully");
//                 }
//             });
//         }
//     });
// };
exports.login = (req, res) => {
    console.log('login')
    if (!req.body.user || !req.body.hash) {
        return res.status(400).json(req.body.user);
    }
    console.log('login1')

    passport.authenticate("owner", (err, user, info) => {
        let token;
        if (err) {
            console.log('login5')
            console.log(err)
            return res.status(500).json(err);
        }
        if (user) {
            token = user.generateJwt();
            console.log(token)
            res.status(200).json({ token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};
// exports.update = (req,res) => {
//     var role = req.type;
//     var userId = req.userId;
//     if (role == 0){
//         User.findById(req.params.id, function(err, user) {
//             if (!user)
//                 res.status(404).send("data is not found");
//             else
//                 Object.assign(user, req.body);
//                 user.setPassword(req.body.hash);
//                 user.save().then(user => {
//                     res.json('user updated!');
//                 })
//                 .catch(err => {
//                     res.status(400).send("Update not possible");
//                 });
//         });
//     }
//     else{
//         if (userId == req.params.id){
//             User.findById(req.params.id, function(err, user) {
//                 if (!user)
//                     res.status(404).send("data is not found");
//                 else
//                     Object.assign(user, req.body);
//                     user.setPassword(req.body.hash);
//                     user.save().then(user => {
//                         res.json('user updated!');
//                     })
//                     .catch(err => {
//                         res.status(400).send("Update not possible");
//                     });
//             });
//         }
//         else {
//              res.json('You are not owner of this profile. So you cannot update');
//         }
//     }    
// };
exports.cPass = (req, res) => {
    console.log('cpass')
        // console.log(req.body.id)
        // console.log(req.body.hash)
    Owner.findOne({ 'user': "admin" }).then(bridal => {
        if (bridal) {
            // return res.status(400).json({ email: 'Photographer already exists' });
            bridal.setPassword(req.body.hash.hash);
            bridal.save((err) => {
                if (err) {
                    res.status(401).json(err);
                } else {
                    res.status(200).json({ result: 'successfully Updated!' });
                }
            })
        } else {
            res.status(401).json("NOne User");

        }
    })
}