var mongoose = require('mongoose'),
    passport = require('passport');
const Client = mongoose.model('Client');
var nodemailer = require('nodemailer');
const Nexmo = require('nexmo');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'ghostatlas@protonmail.com',
        pass: 'QoYZ5d43K4@m1H2Ma'
    },
    tls: {
        rejectUnauthorized: false
    }
});
exports.register = (req, res) => {
    console.log('aaaa');
    if (!req.body.emailAddress ) {
        return res.status(400).json({ message: "All fields required" });
    }
    
    User.findOne({ emailAddress: req.body.emailAddress }).then(client => {
        if (client) {
            return res.status(400).json({ fullname: "User already exists" });
        } else {
            console.log('cccc');
            const client = new User(req.body);
            client.roles = [2];
            client.accessToken = 'access-token-' + Math.random();
            client.refreshToken = 'access-token-' + Math.random();
            client.pic = './assets/media/users/default.jpg';
            if(req.body.hash){
                client.setPassword(req.body.hash);
            }
            else{
                client.setPassword('123456');

            }
            User.countDocuments({}, function(err, c) {
                console.log('location count document')
                client.id = c + 1;
                client.save((err) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        console.log(client);
                        // const token = client.generateJwt();
                        res.status(200).json(client)
                        // res.status(200).json("Registered successfully");
                    }
                });
            })
            
        }
    });
};
// exports.google = (req,res) =>{
//     console.log('1');
//     passport.authenticate('google', { scope: 
//         [ 'https://www.googleapis.com/auth/plus.login',
//         , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] })
// };
// exports.google_callback = (req, res)=>{
//     console.log('2');
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function(req, res) {
//     // res.redirect('/account');
//     res.status(500).json('ssss');
//   };
// }
// exports.google_auth = (req, res) => {
//     console.log('save-0')
//     console.log(req.body.providerId);
//     User.findOne({ providerUserID: req.body.providerId, logtype: 1 }, function(err, client) {
//         if (err) {
//             return res.status(400).json('400 error');
//         }
//         //No user was found... so create a new user with values from Facebook (all the profile. stuff)
//         if (!client) {
//             console.log('save-1')
//             client = new Client({
//                 fullname: req.body.fullname,
//                 email: req.body.email,
//                 providerUserID: req.body.providerId,
//                 logtype: 1,
//                 //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
//                 // facebook: profile._json
//             });
//             console.log('save-2')
//             client.save(function(err) {
//                 if (err) console.log(err);
//                 res.status(200).json({ 'token': req.body.providerId }); // return done(err, client);
//                 // res.status(200).json("Google Registered successfully");

//             });
//         } else {
//             // const token = client.generateJwt();
//             console.log('save-3')
//             res.status(200).json({ 'token': req.body.providerId }); // return done(err, client);
//             // res.status(200).json({token});
//         }
//     });
// }
// exports.facebook_auth = (req, res) => {
//     console.log('save-0')
//     console.log(req.body.providerId);
//     User.findOne({ providerUserID: req.body.providerId, logtype: 2 }, function(err, client) {
//         if (err) {
//             return res.status(400).json('400 error');
//         }
//         //No user was found... so create a new user with values from Facebook (all the profile. stuff)
//         if (!client) {
//             console.log('save-1')
//             client = new Client({
//                 fullname: req.body.fullname,
//                 email: req.body.email,
//                 providerUserID: req.body.providerId,
//                 logtype: 2,
//                 //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
//                 // facebook: profile._json
//             });
//             console.log('save-2')
//             client.save(function(err) {
//                 if (err) console.log(err);
//                 res.status(200).json({ 'token': req.body.providerId }); // return done(err, client);
//                 // res.status(200).json("Google Registered successfully");

//             });
//         } else {
//             // const token = client.generateJwt();
//             console.log('save-3')
//             res.status(200).json({ 'token': req.body.providerId }); // return done(err, client);
//             // res.status(200).json({token});
//         }
//     });
// }
exports.userToken = (req, res) =>{
    User.findById(req.userId, function(err, client) {
        if (!client)
            res.status(404).send("data is not found");
        else
            res.status(200).json(client)
    });
}
exports.login = (req, res) => {
    console.log('login1');
    if (!req.body.emailAddress || !req.body.hash) {
        return res.status(400).json(req.body.emailAddress);
    }
    // console.log(req)
    console.log('login2');
    passport.authenticate("user", (err, client, info) => {
        console.log(client);
        let token;
        if (err) {
            console.log('err');
            return res.status(200).json(false);
        }
        if (client) {
            console.log('client');
            // token = client.generateJwt();
            res.status(200).json(client );
        } else {
            console.log('login3');
            res.status(200).json(false);
        }
    })(req, res);
};
// exports.addMulti = (req, res) =>{
//     var jsonArr = [];
//     jsonArr = JSON.parse(req.body.json);
//     var infoArr = [];
//     jsonArr.forEach((element ,index)=>{
//         User.findOne({email: element[' email ']}).then(user=>{
//             if(user){
//                 infoArr.push('Failed : ' + index + 'th is existed email')
//             }else{
//                 const user = new Client();
//                 if(element[' fullname '])  
//                 user.fullname = element[' fullname '];
//                 if(element[' email '])  
//                     user.email = element[' email '];
//                 if(element[' phone '])  
//                     user.phone = element[' phone '];
//                 if(element[' clientLocation '])  
//                     user.clientLocation = element[' clientLocation '];
//                 if(element[' weddingDate '])  
//                     user.weddingDate = element[' weddingDate '];
//                 if(element[' weddingCity '])  
//                     user.weddingCity = element[' weddingCity '];
//                 if(element[' brideName '])  
//                     user.brideName = element[' brideName '];
//                 if(element[' groomName '])  
//                     user.groomName = element[' groomName '];
//                 if(element[' position '])  
//                     user.position = element[' position '];
//                 user.setPassword('123456');
//                 user.save((err) => {
//                     if (err) {
//                         // res.status(500).json(err);
//                         infoArr.push('Error 500: ' + err)
//                     } else {
//                         // const token = user.generateJwt();
//                         // res.status(200).json("Registered successfully");
//                         infoArr.push('Success 200: ' + index)
//                     }
//                 });
//             }
//         })
//     })
//     res.status(200).json(infoArr)
// }
exports.update = (req, res) => {
    var role = req.type;
    var clientId = req.clientId;
    if (role == 0) {
        User.findById(req.params.id, function(err, client) {
            if (!client)
                res.status(404).send("data is not found");
            else
                Object.assign(client, req.body);
            console.log(client);
            console.log(req.body);
            client.setPassword(req.body.hash);
            client.save().then(client => {
                    res.json('client updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    } else {
        if (clientId == req.params.id) {
            User.findById(req.params.id, function(err, client) {
                if (!client)
                    res.status(404).send("data is not found");
                else
                    Object.assign(client, req.body);
                client.setPassword(req.body.hash);
                client.save().then(client => {
                        res.json('client updated!');
                    })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
            });
        } else {
            res.json('You are not owner of this profile. So you cannot update');
        }
    }
};
exports.updateProfile = (req, res) => {
    // var role = req.type;
    console.log('updateProfile')
    console.log(req.body)
    // var clientId = req.clientId;
    // if (role == 0){
    User.findById(req.body._id, function(err, client) {
        if (!client)
            res.status(404).send("data is not found");
        else
            Object.assign(client, req.body);
    console.log(req.body.hash)

            if(req.body.hash)
               client.setPassword(req.body.hash);
        client.save().then(client => {
                res.status(200).json(client);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
};
exports.updateHash = (req, res) => {
    // var role = req.type;
    console.log('updateHash')
    // var clientId = req.clientId;
    // if (role == 0){
    User.findById(req.body._id, function(err, client) {
        if (!client)
            res.status(404).send("data is not found");
        else
        {
            client.setPassword(req.body.hash);
            client.save().then(client => {
                    res.status(200).json(client);
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
            }
    });
};
exports.delete = (req, res) => {
    // var clientId = req.clientId;
    // var role = req.type;
    // if (role == 0) {
        // User.findByIdAndDelete(req.params.id, function(err, city) {
            User.findOneAndDelete({ id: req.params.id }, function(err, city) {
            if (err) res.json(err);
            else{
                User.countDocuments({}, function(err1, c) {
                    console.log('c')
                    var tempNum = c + 1;
                    User.findOne({id:tempNum}, function(err, client) {
                        if (!client)
                            res.status(500).send("data is not found");
                        else {
                            client.id = city.id;
                            client.save().then(user => {
                                    res.json('city updated!');
                                })
                                .catch(err => {
                                    res.status(400).send("Update not possible");
                                });
                        }
                    });
                
                })
            }
        });
    // } else if (role == 2) {
    //     if (clientId == req.params.id) {
    //         User.findByIdAndRemove({ _id: req.params.id }, function(err, business) {
    //             if (err) res.json(err);
    //             else res.json('Successfully removed');
    //         });
    //     } else {
    //         res.json('You are not owner of this profile. You are not permited');
    //     }
    // } else {
    //     res.json('you are not permited , cannot delete !');
    // }
};
exports.findByIdNum = (req, res) => {
        User.findOne({id:req.body.id}, function(err, client) {
            if (!client)
                res.status(500).send("data is not found");
            else
                res.status(200).json(client);
        });
}
exports.findById = (req, res) => {
    var role = req.logtype;
    // console.log(req.userId)
    if (role == 0) {
        User.findById(req.userId, function(err, client) {
            if (!client)
                res.status(500).send("data is not found");
            else
                res.status(200).json(client);
        });
    } else {
        // res.json('you are not admin , cannot access !');
        console.log('abc')
            // console.log(req.headers.token)
            User.findOne({ providerUserID: req.providerId }, function(err, client) {
            if (!client)
                res.status(500).send("data is not found");
            else
                res.status(200).json(client);
        });
    }
}
exports.getAll = (req, res) => {
    User.find({}, function(err, client) {
        if (err) {
            console.log(err);
        } else {
            res.json(client);
        }
    })
}
// exports.updateClientVendor = (req, res) => {
//     // var role = req.type;
//     // var clientId = req.clientId;
//     // if (role == 0){
//     User.findOne({ 'email': req.body.tempEmail }, function(err, client) {
//         if (!client)
//             res.status(404).send("data is not found");
//         else
//             Object.assign(client, req.body);
//         // client.setPassword(req.body.hash);
//         client.save().then(client => {
//                 res.json('client updated!');
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// };
// exports.delClient = (req, res) => {
//     User.findOneAndRemove({ 'email': req.body.email }, function(err, client) {
//         if (err) res.json(err);
//         else res.json('Successfully removed');
//     })
// }

// verify
exports.emailverify = (req, res) => {
    console.log('  sdjklfsjdklfjsadl;fjsda;fjsa;lfj;sf;js')
    let HelperOptions = {
        from: 'Verify Notification',
        to: req.body.email,
        subject: 'Verify Notification',
        text: 'Verfiy Code :' + req.body.code,
    };
    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(401).json(error)
        } else {
            return res.status(200).json(info);
        }
        // console.log('bbb');
    })
}
// exports.phoneverify = (req, res) => {

//     const nexmo = new Nexmo({
//         apiKey: '23fe25b0',
//         apiSecret: 'OV2v0WxOO13iLtQL',
//     });

//     const from = 8613322166930;
//     // const to = (Number)(req.body.phone);
//     const to = 8613322166930;
//     const text = req.body.code;
//     nexmo.message.sendSms(from, to, text, { type: 'unicode' }, (err, responseData) => {
//         if (err) {
//             console.log(err)
//             return res.status(401).json(err);
//         } else {
//             if (responseData.messages[0]['status'] === "0") {
//                 console.log("Message sent successfully.");
//                 return res.status(200).json("Message sent successfully.");
//             } else {
//                 console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//                 return res.status(200).json(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//             }
//         }
//     });
// }
// exports.setPhone = (req, res) => {
//     User.findById(req.body.id, function(err, client) {
//         if (!client)
//             res.status(500).send("data is not found");
//         else {
//             client.verifyStatus.phoneVerify = true;
//             client.save().then(user => {
//                     res.json('user updated!');
//                 })
//                 .catch(err => {
//                     res.status(400).send("Update not possible");
//                 });
//         }
//     });
// }
// exports.setPhoneEmail = (req, res) => {
//     User.findOne({email:req.email}, function(err, client) {
//         if (!client)
//             res.status(500).send("data is not found");
//         else {
//             client.verifyStatus.phoneVerify = true;
//             client.save().then(user => {
//                     res.json('user updated!');
//                 })
//                 .catch(err => {
//                     res.status(400).send("Update not possible");
//                 });
//         }
//     });
// }
exports.setEmail = (req, res) => {
    User.indById(req.body.id, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.verifyStatus.emailVerify = true;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
}
// =======   Bank  ============
exports.getAllBank = (req, res) => {
    Bank.find({}, function(err, client) {
        if (err) {
            console.log(err);
        } else {
            res.json(client);
        }
    })
}
exports.createBank = (req, res) => {
    Bank.findById(req.body.id).then(location => {
        if (location) {
            return res.status(400).json({ reviewName: "location already exists" });
        } else {
            var location = new Bank(req.body);
            if(req.body.type != 'Fund')
                location.topic = location.Issuer + ' - ' + location.Coupon.toFixed(2) + '% - ' + location.MaturityDate.getDate() + '/' +  + location.MaturityDate.getMonth() + '/' +  + location.MaturityDate.getFullYear();
            else
                location.topic = location.Issuer;
            Bank.countDocuments({}, function(err, c) {
                console.log('location count document')
                location.id = c + 1;
                location.save((err) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(location);
                    }
                });
            })
        }
    });
};

exports.updateBank = (req, res) => {
    Bank.findOne({id:req.body.id}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            Object.assign(client, req.body);
            console.log('updateBank')
            console.log(req.body)
            console.log(req.params.id)
            if(client.type != 'Fund')
             client.topic = client.Issuer + ' - ' + client.Coupon.toFixed(2) + '% - ' + client.MaturityDate.toString().slice(0,10);
            else
             location.topic = location.Issuer;
               client.save().then(user => {
                    res.status(200).json(client);
                })
                .catch(err => {
                    res.status(200).send("Update not possible");
                });
        }
    });

};
exports.findBank = (req, res) => {
    Bank.findOne({id:req.params.id}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            res.status(200).json(client)
        }
    });

};
exports.removeBank = (req, res) => {
    console.log('remove')
    Bank.findOneAndDelete({id:req.params.id}, function(err, city) {
        if (err) res.json(err);
        else{
            // res.status(200).send('removed');
            Bank.countDocuments({}, function(err1, c) {
                console.log('c')
                console.log('location count document')
                Bank.findOne({id:c}, function(err, client) {
                    if (!client)
                        res.status(500).send("data is not found");
                    else {
                        client.id = city.id;
                        Bank.save().then(user => {
                                res.json('city updated!');
                            })
                            .catch(err => {
                                res.status(400).send("Update not possible");
                            });
                    }
                });
               
            })
        }
    });
};
exports.removeMultiBank = (req, res) => {
    console.log('remove')
    var arrNum = req.body.prdocutIdsForDelete;
    var count;
    Bank.countDocuments({}, function(err1, c) {
        count = c;
    });
    arrNum.forEach(element => {
        Bank.findOneAndDelete({id:element}, function(err, city) {
            if (err) {}
            else{
            }
        });    
    });
   if(arrNum.length < count){
        console.log('1')
        var forLen = count - arrNum.length;
        var reArr = [-1];
        var ind = 1;
        for(let j = 1;j <=count;j ++){
            var flag = arrNum.filter(subNum=>subNum === j);
            if(!flag){
                reArr[ind] = j;
                ind ++;
            }
        }
        for(let i = inde ; i <= forLen; i++){
            Bank.findOne({id:i}, function(err1, subbank){
                if(!subbank){
                    Bind.findOne({id:reArr[i]}, function(err2, ssBank){
                        if(ssBank){
                            ssBank.id = i;
                            ssBank.save().then(user => {
                                // res.json('city updated!');
                            })
                            .catch(err => {
                                // res.status(400).send("Update not possible");
                            });
                        }
                    })
                }
            })
        }
   }
};

// =======   Request  ============
exports.getAllRequest = (req, res) => {
    Requests.find({}, function(err, client) {
        if (err) {
            console.log(err);
        } else {
            res.json(client);
        }
    }).populate(['userId','bankId']).exec();
}
exports.getAllRequestId = (req, res) => {
    Requests.find({userId:req.body.aId}, function(err, client) {
        if (err) {
            console.log(err);
        } else {
            res.json(client);
        }
    }).populate(['userId','bankId']).exec();
}
exports.addRequest = (req, res) => {
    Requests.findById(req.body.id).then(location => {
        if (location) {
            return res.status(400).json({ reviewName: "location already exists" });
        } else {
            var location = new Requests(req.body);
            Requests.countDocuments({}, function(err, c) {
                console.log('location count document')
                location.id = c + 1;
                location.save((err) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        User.findById(location.userId, function(errUser, user) {
                            if(!user){

                            }else{
                                user.totalEquity += req.body.equity;
                                    user.save().then(user => {
                                        res.status(200).json(location);
                                        // res.json('city updated!');
                                    })
                                    .catch(err => {
                                        // res.status(400).send("Update not possible");
                                    });
                            }
                        })

                    }
                });
            })
        }
    })
};

exports.updateRequest = (req, res) => {
    Requests.findOne({id:req.body.id}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            User.findById(client.userId, function(err, client1){
                var tempEquity = client1.totalEquity;
                Object.assign(client, req.body);
                client.save().then(user => {
                        client1.totalEquity += req.body.equity;
                        client1.totalEquity -= tempEquity;
                        client1.save().then(userx => {
                            res.status(200).json(location);
                            // res.json('city updated!');
                        })
                        .catch(err => {
                            // res.status(400).send("Update not possible");
                        });
                        res.status(200).json(client);
                    })
                    .catch(err => {
                        res.status(200).send("Update not possible");
                    });
            })
            
        }
    })

};
exports.findRequest = (req, res) => {
    Bank.findOne({id:req.params.id}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            res.status(200).json(client)
        }
    }).populate(['userId','bankId']).exec();

};
exports.removeRequest = (req, res) => {
    console.log('remove')
    Requests.findOneAndDelete({id:req.params.id}, function(err, city) {
        if (err) res.json(err);
        else{
            if(city){
                User.findById(city.userId, function(err, client1){
                    client1.totalEquity -= req.body.equity;
                    client1.save().then(userx => {
                        // res.json('city updated!');
                    })
                    .catch(err => {
                        // res.status(400).send("Update not possible");
                    });
                })
            }
            // res.status(200).send('removed');
            Requests.countDocuments({}, function(err1, c) {
                console.log('c')
                console.log('location count document')
                Requests.findOne({id:c+1}, function(err, client) {
                    if (!client)
                        res.status(200).send("data is not found");
                    else {
                        client.id = city.id;
                        client.save().then(user => {
                                res.json('city updated!');
                            })
                            .catch(err => {
                                res.status(400).send("Update not possible");
                            });
                    }
                });
               
            })
        }
    });
};
exports.upload = (req, res )=>{
    console.log('= upload')
    console.log(req.params.file)
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("OK");
}
exports.addFiles = (req, res) =>{
    Addfiles.findById(req.body.userId).then(location => {
        if (location) {
            return res.status(400).json({ reviewName: "location already exists" });
        } else {
            var location = new Addfiles(req.body);
            location.date = new Date();
            location.save().then(user => {
                res.json('city updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    })
}
exports.getFiles = (req, res) =>{
    console.log('getfiles')
    Addfiles.find({'userId':req.body.id}, function(err, client) {
        if (err) {
            console.log(err);
        } else {
            res.json(client);
        }
    }).populate(['userId']).exec();
}
exports.getAllFiles = (req, res) =>{
    Addfiles.find({}, function(err, client) {
        if (err) {
            console.log(err);
        } else {
            res.json(client);
        }
    }).populate(['userId']).exec();
}
exports.forgotPassword = (req, res) =>{
    User.findOne({'emailAddress':req.params.email}).then(client => {
        if (!client) {
            return res.status(200).json(false)
        } else {
            var newPass =   Math.random().toString(20).substr(2, 6)
            client.setPassword(newPass);
            console.log('  sdjklfsjdklfjsadl;fjsda;fjsa;lfj;sf;js')
            let HelperOptions = {
                from: 'Verify Notification',
                to: req.params.email,
                subject: 'Password Reset',
                html: `
                    <h3>Hi ${client.firstName} </h3>
                    <p>You've recently requested a new password reset.</p>
                    <h3>  New Password: ${newPass}</h3>
                    <p> If you do not request a password reset. please ignore this email or reply to let us know . This password is only valid for the next 30 minutes</p>`,
            };
            transporter.sendMail(HelperOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(401).json(error)
                } else {
                    client.save().then(user1 => {
                        res.json('password updated!');
                    })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
                    return res.status(200).json(info);
                }
                // console.log('bbb');
            })
        }
    });
}
exports.delFile = (req, res) => {
    Addfiles.findOneAndDelete({id:req.params.id}, function(err, city) {
        if (err) res.json(err);
        else{
            res.status(200).json('deleted')
        }
    });
}