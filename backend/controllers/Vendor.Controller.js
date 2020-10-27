var mongoose = require('mongoose'),
    passport = require('passport');
const Nexmo = require('nexmo');

var fs = require('fs');
var path = require('path');
const Vendor = mongoose.model('Vendor');
const Images = mongoose.model('Images');
var BridalDesigner = require("./category/BridalDesigner.Controller");
var BridalMakeupArtist = require("./category/BridalMakeupArtist.Controller");
var Choreographer = require("./category/Choreographer.Controller");
var MehndiArtist = require("./category/MehndiArtist.Controller");
var Photographer = require("./category/Photographer.Controller");
var Venue = require("./category/Venue.Controller");
var WeddingDecorator = require("./category/WeddingDecorator.Controller");
var WeddingInvitation = require("./category/WeddingInvitation.Controller");
var WeddingPlanner = require("./category/WeddingPlanner.Controller");
var BandBajaGhodiwala = require("./category/BandBajaGhodiwala.Controller");
var Caterer = require("./category/Caterer.Controller");
var PriestPandit = require("./category/PriestPandit.Controller");
var TravelHoneymoon = require("./category/TravelHoneymoon.Controller");
var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'superpunch727@gmail.com',
        pass: 'rams1998727'
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.create = (req, res) => {
    var type = req.body.type;
    console.log('============ create ============');
    console.log(type);
    console.log('============ create ============')
    if (type == 'BridalDesigner') {
        BridalDesigner.create(req, res);
    } else if (type == 'BridalMakeupArtist') {
        BridalMakeupArtist.create(req, res);
    } else if (type == 'Choreographer') {
        Choreographer.create(req, res);
    } else if (type == 'MehndiArtist') {
        MehndiArtist.create(req, res);
    } else if (type == 'Photographer') {
        Photographer.create(req, res);
    } else if (type == 'Venue') {
        Venue.create(req, res);
    } else if (type == 'WeddingDecorator') {
        WeddingDecorator.create(req, res);
    } else if (type == 'WeddingInvitation') {
        WeddingInvitation.create(req, res);
    } else if (type == 'WeddingPlanner') {
        WeddingPlanner.create(req, res);
    } else if (type == 'BandBajaGhodiwala') {
        BandBajaGhodiwala.create(req, res);
    }else if (type == 'Caterer') {
        Caterer.create(req, res);
    }else if (type == 'PriestPandit') {
        PriestPandit.create(req, res);
    }else if (type == 'TravelHoneymoon') {
        TravelHoneymoon.create(req, res);
    } else {
        res.json('sorry, this type is not exist');
    }
}
exports.addMulti = (req, res) =>{
    var jsonArr = [];
    jsonArr = JSON.parse(req.body.json);
    var infoArr = [];
    jsonArr.forEach((element ,index)=>{
        Vendor.findOne({email: element[' email ']}).then(user=>{
            if(user){
                infoArr.push('Failed : ' + index + 'th is existed email')
            }else{
                const user = new Vendor();
                if(element[' type '])  
                user.type = element[' type '];
                if(element[' brandname '])  
                    user.brandname = element[' brandname '];
                if(element[' email '])  
                    user.email = element[' email '];
                if(element[' phone '])  
                    user.phone = element[' phone '];
                if(element[' introduction '])  
                    user.introduction = element[' introduction '];
                if(element[' workingSince '])  
                    user.workingSince = element[' workingSince '];
                if(element[' businessCity '])  
                    user.businessCity = element[' businessCity '];
                if(element[' area '])  
                    user.area = element[' area '];
                if(element[' pincode '])  
                    user.pincode = element[' pincode '];
                if(element[' mainImg '])  
                    user.mainImg = element[' mainImg '];
                if(element[' pastworkPhotos '])  {
                    user.pastworkPhotos = element[' pastworkPhotos '].split(",");
                }
                if(element[' pastworkVideos '])  {
                    user.pastworkPhotos = element[' pastworkVideos '].split(",");

                }
                if(element[' basicPrice '])  
                    user.basicPrice = element[' basicPrice '];
                user.submittedDate = new Date().toString();
                user.setPassword('123456');
                user.save((err) => {
                    if (err) {
                        // res.status(500).json(err);
                        infoArr.push('Error 500: ' + err)
                    } else {
                        // const token = user.generateJwt();
                        // res.status(200).json("Registered successfully");
                        infoArr.push('Success 200: ' + index)
                    }
                });
            }
        })
    })
    res.status(200).json(infoArr)
}
exports.register = (req, res) => {
    if (!req.body.username || !req.body.hash) {
        return res.status(400).json({ message: "All fields required" });
    }
    Vendor.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ useranme: "user already exists" });
        } else {
            const user = new Vendor(req.body);
            user.setPassword(req.body.hash);
            user.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    const token = user.generateJwt();
                    res.status(200).json("Registered successfully");
                }
            });
        }
    });
};

exports.login = (req, res) => {
    console.log('login1');
    if (!req.body.email || !req.body.hash) {
        return res.status(400).json(req.body.email);
    }
    console.log('login2');
    passport.authenticate("vendor", (err, vendor, info) => {
        let token;
        if (err) {
            console.log('err');
            return res.status(500).json(err);
        }
        if (vendor) {
            console.log('vendor');
            token = vendor.generateJwt();
            res.status(200).json({ token });
        } else {
            console.log('login3');
            console.log(info)
            res.status(401).json(info);
        }
    })(req, res);
};
exports.update = (req, res) => {
    console.log('type');
    var type = req.body.type;
    if (type == 'BridalDesigner') {
        BridalDesigner.update(req, res);
    } else if (type == 'BridalMakeupArtist') {
        BridalMakeupArtist.update(req, res);
    } else if (type == 'Choreographer') {
        Choreographer.update(req, res);
    } else if (type == 'MehndiArtist') {
        MehndiArtist.update(req, res);
    } else if (type == 'Photographer') {
        Photographer.update(req, res);
    } else if (type == 'Venue') {
        Venue.update(req, res);
    } else if (type == 'WeddingDecorator') {
        WeddingDecorator.update(req, res);
    } else if (type == 'WeddingInvitation') {
        WeddingInvitation.update(req, res);
    } else if (type == 'WeddingPlanner') {
        WeddingPlanner.update(req, res);
    } else if (type == 'BandBajaGhodiwala') {
        BandBajaGhodiwala.update(req, res);
    }
    else if (type == 'Caterer') {
        Caterer.update(req, res);
    }
    else if (type == 'PriestPandit') {
        PriestPandit.update(req, res);
    }
    else if (type == 'TravelHoneymoon') {
        TravelHoneymoon.update(req, res);
    } else {
        res.json('sorry, this type is not exist');
    }
};
exports.delete = (req, res) => {
    var userId = req.userId;
    var role = req.type;
    if (role == 0) {
        Vendor.findByIdAndRemove({ _id: req.params.id }, function(err, business) {
            if (err) res.json(err);
            else res.json('Successfully removed');
        });
    } else if (role == 2) {
        if (userId == req.params.id) {
            Vendor.findByIdAndRemove({ _id: req.params.id }, function(err, business) {
                if (err) res.json(err);
                else res.json('Successfully removed');
            });
        } else {
            res.json('You are not owner of this profile. You are not permited');
        }
    } else {
        res.json('you are not permited , cannot delete !');
    }
};
exports.findById = (req, res) => {
    // var role = req.type;
    // if (role == 0){
    //     Vendor.findById(req.params.id, function(err, user) {
    //         if (!user)
    //             res.status(500).send("data is not found");
    //         else
    //             res.status(200).json(user);    
    //     });
    // }
    // else{
    //     res.json('you are not admin , cannot access !');
    // }
    var role = req.logtype;
    // console.log(req.userId)
    if (role == 0) {
        Vendor.findById(req.userId, function(err, client) {
            if (!client)
                res.status(500).send("data is not found");
            else
                res.status(200).json(client);
        });
    } else {
        // res.json('you are not admin , cannot access !');
        console.log('abc')
            // console.log(req.headers.token)
        Vendor.findOne({ providerUserID: req.providerId }, function(err, client) {
            if (!client)
                res.status(500).send("data is not found");
            else
                res.status(200).json(client);
        });
    }
}
exports.setMainImg = (req, res) => {
    Vendor.findById(req.body.id, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.mainImg = req.body.img;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
}
exports.uploadImgs = (req, res, next) => {
    console.log('>>>>>>> upload Img <<<<<<<<<<<<<')
    console.log(req.userId);
    // const files = req.files;
    // console.log(files);
    // if (!files) {
        // const error = new Error('no file')
        // error.httpStatusCode = 400
        // return next(errr)
        // console.log('sss')
    // }
    // return res.send({status:'ok'})
    // res.send({ results: files });
    // console.log(file);
}
exports.findByIdDetail = (req, res) => {
    console.log('findByIdDetail')
    Vendor.findById(req.body.id, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else
            res.status(200).json(client);
    });
}
exports.uploadImg = (req, res, next) => {
    const file = req.file
    console.log(file.filename);
    if (!file) {
        console.log('sss')
    }
    console.log(file);
}
exports.new_album = (req, res, next) => {
    console.log('new_album_first')
    console.log(req.body._id);
    console.log(req.body.pastworkPhotos);
    Vendor.findById(req.body._id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            if (user.pastworkPhotos) {
                for (let pastworkPhoto of user.pastworkPhotos) {
                    if (pastworkPhoto == req.body.newName) {
                        return res.status(400).send("exist album");
                    }
                }
            } else user.pastworkPhotos = [];
            user.pastworkPhotos.push(req.body.newName);
            // const DIR = './public/uploads/' + req.body._id;
            // const DIR = './public/client/src/uploads/' + req.body._id;
            // if (!fs.existsSync(DIR)) {
            //     fs.mkdirSync(DIR);
            // }
            // const SubDIR = DIR + '/' + req.body.newName;
            // if (!fs.existsSync(SubDIR)) {
            //     fs.mkdirSync(SubDIR);
            // }
            // console.log(user.pastworkPhotos);
            //     user.pastworkPhotos
            // Object.assign(user, req.body);

            // client.setPassword(req.body.hash);
            user.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }

    });
}
exports.addPhoto = (req, res, next) => {
    console.log('addPhoto')
    Images.findById('newId', function(err, user) {
        if (user){
            console.log('aaaa')
            res.status(404).send("data is not found");
        }
        else {
            const newUser = new Images(req.body);
            newUser.save().then(user => {
                console.log('asdasdasd')
                        Images.find({}, function(err, vendor) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json(vendor);
                            }
                        }).populate(['vendorId']).exec();
                })
                .catch(err => {

                    res.status(400).send("Update not possible");
                });
        }

    });
}
exports.get_album = (req, res, next) => {
    console.log('get_album')
    Vendor.findById(req.body._id, function(err, vendor) {
        if (!vendor) {
            res.status(404).send("data is not found");
        } else {
            if (vendor.pastworkPhotos) {
                // let array_work = [];
                var array_work = new Array();
                i = 0;
                for (let pastworkPhoto of vendor.pastworkPhotos) {
                    // console.log(i);
                    // console.log(vendor.pastworkPhotos);
                    // console.log(pastworkPhoto)
                    // var DIR = './public/uploads/' + req.body._id + '/' + pastworkPhoto;
                    var DIR = './public/client/src/uploads/' + req.body._id + '/' + pastworkPhoto;
                    // console.log(DIR)
                    // var path_DIR = 'public/uploads/' + req.body._id + '/' + pastworkPhoto;
                    var path_DIR = req.body._id + '/' + pastworkPhoto;
                    if (!fs.existsSync(DIR)) {
                        console.log('d')
                        fs.mkdirSync(DIR);
                    }
                    if (fs.readdirSync(DIR).length == 0)
                        array_work.push({ 'album': pastworkPhoto, 'path': path_DIR, 'photo': 'none', 'count': 0 })
                    else {
                        array_work.push({ 'album': pastworkPhoto, 'path': path_DIR, 'photo': path_DIR + '/' + fs.readdirSync(DIR)[0], 'count': fs.readdirSync(DIR).length })
                    }
                    i++;
                }
                console.log(array_work);

                res.status(200).json(array_work);
            }
        }
    });
}
exports.get_video = (req, res, next) => {
    Vendor.findById(req.body._id, function(err, vendor) {
        if (!vendor) {
            res.status(404).send("data is not found");
        } else {
            res.status(200).json(vendor.pastworkVideos);
        }
    });
}
exports.get_photo = (req, res, next) => {
    console.log('get_album')
    Vendor.findById(req.body._id, function(err, vendor) {
        if (!vendor) {
            res.status(404).send("data is not found");
        } else {
            if (vendor.pastworkPhotos) {
                var array_work = new Array();
                // var DIR = './public/uploads/' + req.body._id + '/' + req.body.album;
                var DIR = './public/client/src/uploads/' + req.body._id + '/' + req.body.album;
                // var path_DIR = 'public/uploads/' + req.body._id + '/' + req.body.album + '/';
                var path_DIR = req.body._id + '/' + req.body.album + '/';
                if (!fs.existsSync(DIR)) {
                    console.log('d')
                    fs.mkdirSync(DIR);
                }
                if (fs.readdirSync(DIR).length != 0) {
                    // console.log(fs.readdirSync(DIR));
                    fs.readdirSync(DIR).forEach(file => {
                        array_work.push({ 'path': path_DIR + file })
                    });
                } else {
                    return res.status(404).json('nothing');
                }
                console.log(array_work);
                res.status(200).json(array_work);
            }
        }
    });
}   
exports.getTotalAllImgs = (req, res, next) =>{
    Images.find({}, function(err, vendor) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(vendor);
                }
            }).populate(['vendorId']).exec();
}
exports.getAllImgs = (req, res, next) =>{
    Images.find({vendorId:req.body._id}, function(err, vendor) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(vendor);
                }
            }).populate(['vendorId']).exec();
}
// exports.getAllPhotos = (req, res, next) => {
//         function getFilesFromDir(dir, fileTypes) {
//             var filesToReturn = [];

//             function walkDir(currentPath) {
//                 var files = fs.readdirSync(currentPath);
//                 for (var i in files) {
//                     var curFile = path.join(currentPath, files[i]);
//                     if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
//                         filesToReturn.push(curFile.replace(dir, ''));
//                     } else if (fs.statSync(curFile).isDirectory()) {
//                         walkDir(curFile);
//                     }
//                 }
//             };
//             walkDir(dir);
//             return filesToReturn;
//         }
//         Vendor.findById(req.body._id, function(err, vendor) {
//             if (!vendor) {
//                 res.status(404).send("data is not found");
//             } else {
//                 if (vendor.pastworkPhotos) {
//                     var array_work = new Array();
//                     // var DIR = './public/uploads/' + req.body._id;
//                     var DIR = './public/client/src/uploads/' + req.body._id;
//                     if (!fs.existsSync(DIR)) {
//                         fs.mkdirSync(DIR);
//                     }
//                     var fff = getFilesFromDir(DIR, [".jpg", ".png"]);
//                     // console.log(fff)
//                     if (fff.length > 0)
//                         return res.status(200).json(fff);
//                     return res.status(404).json('nothing');
//                     // if (fs.readdirSync(DIR).length != 0) {   
//                     //     // console.log(fs.readdirSync(DIR));
//                     //     fs.readdirSync(DIR).forEach(file => {
//                     //         array_work.push({ 'path': path_DIR + file })
//                     //     });
//                     // } else {
//                     //     return res.status(404).json('nothing');
//                     // }
//                     // console.log(array_work);
//                     // res.status(200).json(array_work);
//                 }
//             }
//         });
// }
    //dynamic sarch 
exports.search = (req, res) => {
    var query = {};
    console.log('1')
    Object.assign(query, { 'status': 'allow' });

    if (req.body.type) {
        Object.assign(query, { 'type': req.body.type });
    }
    if (req.body.businessCity) {
        Object.assign(query, { 'businessCity': req.body.businessCity });
    }
    // =venue=
    if (req.body.propertyType) {
        Object.assign(query, { 'propertyType': req.body.propertyType });
    }
    if (req.body.typeOfArea) {
        Object.assign(query, { 'typeOfArea': req.body.typeOfArea });
    }
    // = planner = 
    if (req.body.otherWorkLocation) {
        Object.assign(query, { 'otherWorkLocation': req.body.otherWorkLocation });
    }
    if (req.body.minPrice) {
        Object.assign(query, { startingPackagePrice: { $gte: req.body.minPrice } });
        if (req.body.maxPrice) {
            Object.assign(query.startingPackagePrice, { $lte: req.body.maxPrice });
        }
    }
    if (req.body.maxPrice) {
        Object.assign(query, { startingPackagePrice: { $lte: req.body.maxPrice } });
        if (req.body.minPrice) {
            Object.assign(query.startingPackagePrice, { $gte: req.body.minPrice });
        }
    }
    // if( req.body.from){
    //     Object.assign(query,{year:{$gte:parseInt(req.body.from, 10)}});
    //     if( req.body.from && req.body.to){
    //         Object.assign(query.year,{$lte:parseInt(req.body.to,10)});
    //     }
    // }
    // if( req.body.to){
    //     Object.assign(query,{year:{$lte:parseInt(req.body.to,10)}});
    //     if( req.body.from && req.body.to){
    //         Object.assign(query.year,{$gte:parseInt(req.body.from, 10)});
    //     }
    // }
    // Vendor.find(query, null, { sort: { membership: -1 } }, function(err, vendor) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.json(vendor);
    //         }
    //     })
    // }).populate(['make','model']).exec();
    Vendor.find(query).sort({ 'membership': -1 }).exec(function(err, blogs) {
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

};
exports.addVideoUrl = (req, res) => {
    console.log('add_videoUrl')
    console.log(req.body._id);
    Vendor.findById(req.body._id, function(err, user) {

        if (!user)
            res.status(404).send("data is not found");
        else {
            if (user.pastworkVideos) {
                for (let pastworkVideo of user.pastworkVideos) {
                    if (pastworkVideo == req.body.videourl) {
                        return res.status(400).send("exist video");
                    }
                }
            } else user.pastworkVideos = [];
            user.pastworkVideos.push(req.body.videourl);
            user.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }

    });
}
exports.cPass = (req, res) => {
    console.log('cpass')
    console.log(req.body.id)
    console.log(req.body.hash)
    Vendor.findById(req.body.id).then(bridal => {
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
            const bridal = new Photographer(req.body);
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
}
exports.getAll = (req, res) => {
    Vendor.find({}, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendor);
        }
    })
}
exports.setStatus = (req, res) => {
    Vendor.findOne({ email: req.body.email }).then(user => {
        if (user) {
            if (user.status == 'allow')
                user.status = 'false'
            else
                user.status = 'allow'
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
exports.delVendor = (req, res) => {
    Vendor.findOneAndRemove({ email: req.body.email }, function(err, business) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
}
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
exports.phoneverify = (req, res) => {

    const nexmo = new Nexmo({
        apiKey: '23fe25b0',
        apiSecret: 'OV2v0WxOO13iLtQL',
    });

    const from = 8613322166930;
    // const to = (Number)(req.body.phone);
    const to = 8613322166930;
    const text = req.body.code;
    nexmo.message.sendSms(from, to, text, { type: 'unicode' }, (err, responseData) => {
        if (err) {
            console.log(err)
            return res.status(401).json(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                return res.status(200).json("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                return res.status(200).json(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    });
}
exports.setPhone = (req, res) => {
    Vendor.findById(req.body.id, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.verifyStatus.phoneVerify = true;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
}
exports.setPhoneAdmin = (req, res) => {
    Vendor.findOne({email:req.body.email}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.verifyStatus.phoneVerify = !req.body.status;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Update not possible");
                });
        }
    }); 
}
exports.setVendorAdmin = (req, res) => {
    Vendor.findOne({email:req.body.email}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.isVendorVerified = !req.body.status;
            client.reviewedDate = new Date().toString();
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Update not possible");
                });
        }
    }); 
}
exports.setEmailAdmin = (req, res) => {
    Vendor.findOne({email:req.body.email}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.verifyStatus.emailVerify = !req.body.status;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Update not possible");
                });
        }
    }); 
}
exports.setPhoneEmail = (req, res) => {
    Vendor.findOne({email:req.email}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.verifyStatus.phoneVerify = true;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
}
exports.setMembership = (req, res) => {
    Vendor.findById(req.body.id, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.membership = req.body.membership;
            if (client.membership == 2)
                client.reviewNum += 5;
            if (client.membership == 1)
                client.reviewNum += 2;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
}
exports.setEmail = (req, res) => {
    Vendor.findById(req.body.id, function(err, client) {
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
exports.changeReview = (req, res) => {
    Vendor.findOne({ 'email': req.body.email }, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            console.log('changereview')
            console.log(client.reviewCnt)
            console.log(client.reviewAvg)
            console.log(req.body.flag)
            console.log(req.body.avg)
            var tempCnt = client.reviewCnt + req.body.flag;
            if (tempCnt == 0) {
                client.reviewAvg = 0.0;
                client.reviewCnt = 0;
            } else {
                var tempAvg = (client.reviewAvg * client.reviewCnt + req.body.flag * req.body.avg) / tempCnt;
                client.reviewAvg = tempAvg;
                console.log('tempCnt')
                console.log(tempCnt)
                console.log(tempAvg)
                client.reviewCnt = tempCnt;
            }

            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
}
exports.reduceNum = (req, res) => {
    Vendor.findById(req.body.id, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.reviewNum -= 1;
            client.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
}