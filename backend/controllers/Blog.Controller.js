var mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const Blogcategory = mongoose.model('Blogcategory');
exports.create = (req, res) => {
    console.log('asdasdasdd')
    console.log(req.body)
    Blog.findOne({ topic: '' }).then(user => {
        if (user) {
            console.log(user)
            return res.status(400).json({ reviewName: "review already exists" });
        } else {
            console.log('dfdfsdfd')
            // console.log(user)
            console.log(req.body)
            const bridal = new Blog(req.body);
            if(!req.body.createDate)
                bridal.createDate = new Date().toString().slice(0,10);
            else
                bridal.createDate = req.body.createDate;
            if(!req.body.viewCount)
                bridal.viewCount  = 5;
            else
                bridal.viewCount = req.body.viewCount;
            if(req.body.type)   bridal.type = req.body.type;
            if(req.body.topic) bridal.topic = req.body.topic;
            if(req.body.mainImg) bridal.mainImg = req.body.mainImg;
            if(req.body.mainCaptain) bridal.mainCaptain = req.body.mainCaptain;
            if(req.body.mainLink) bridal.mainLink = req.body.mainLink;
            if(req.body.blogTags){
                var tempBlogTagArr = JSON.parse(req.body.blogTags);
                bridal.blogTag = [];
                for(let i = 0; i<tempBlogTagArr.length; i++)
                    bridal.blogTag[i] = tempBlogTagArr[i];
            }
            if(req.body.subContentArr){
                var tempContentObj = JSON.parse(req.body.subContentArr);
                var tempTopicObj = JSON.parse(req.body.subTopicArr);
                var tempCaptainObj = JSON.parse(req.body.subCaptainArr);
                var tempImgObj = JSON.parse(req.body.imgArr);
                var tempImgLink = JSON.parse(req.body.subLinkArr);
                bridal.subParts = [];
                for(let i = 0; i< tempContentObj.length;i ++){
                    bridal.subParts[i]={
                        subContent:tempContentObj[i],
                        subTopic:tempTopicObj[i],
                        subImg:tempImgObj[i],
                        subCaptain:tempCaptainObj[i],
                        subLink:tempImgLink[i],
                    };
                }      
            }
            bridal.save((err) => {
                if (err) {
                    res.status(401).json(err);
                } else {
                    res.status(200).json({ result: 'successfully Updated!' });
                }
            })
        }
    });
};
exports.update = (req, res) => {
    console.log('>>>>>>> update blog <<<<<<<<')
    console.log(req.body)
    Blog.findById(req.body.id).then(bridal => {
        if (bridal) {
            // return res.status(400).json({ email: 'Photographer already exists' });
            if(req.body.count == '1')
                bridal.viewCount += 1;
            if(!req.body.modifyDate)
                bridal.modifyDate = new Date().toString().slice(0,10);
            else
                bridal.modifyDate = req.body.modifyDate;
            if(!req.body.viewCount)
                bridal.viewCount  = 5;
            else
                bridal.viewCount = req.body.viewCount;
                if(req.body.blogTags){
                    var tempBlogTagArr = JSON.parse(req.body.blogTags);
                    bridal.blogTag = [];
                    for(let i = 0; i<tempBlogTagArr.length; i++)
                        bridal.blogTag[i] = tempBlogTagArr[i];
                }
    
            if(req.body.type)   bridal.type = req.body.type;
            if(req.body.topic) bridal.topic = req.body.topic;
            if(req.body.createDate) bridal.createDate = req.body.date;
            if(req.body.mainImg) bridal.mainImg = req.body.mainImg;
            if(req.body.mainCaptain) bridal.mainCaptain = req.body.mainCaptain;
            if(req.body.mainLink) bridal.mainLink = req.body.mainLink;
            if(req.body.subContentArr){
                var tempContentObj = JSON.parse(req.body.subContentArr);
                var tempTopicObj = JSON.parse(req.body.subTopicArr);
                var tempCaptainObj = JSON.parse(req.body.subCaptainArr);
                var tempImgObj = JSON.parse(req.body.imgArr);
                var tempImgLink = JSON.parse(req.body.subLinkArr);
                bridal.subParts = [];
                for(let i = 0; i< tempContentObj.length;i ++){
                    bridal.subParts[i]={
                        subContent:tempContentObj[i],
                        subTopic:tempTopicObj[i],
                        subImg:tempImgObj[i],
                        subCaptain:tempCaptainObj[i],
                        subLink:tempImgLink[i],
                    };
                }      
            }
            bridal.save((err) => {
                if (err) {
                    res.status(401).json(err);
                } else {
                    res.status(200).json({ result: 'successfully Updated!' });
                }
            })
        } else {
           res.status(401).json('nothing');
        }
    })

};
exports.findAll = (req, res) => {
    Blog.find({}).populate(['authorId','type']).sort({ 'createDate': 1 }).exec(function(err, blogs) {
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
    if(req.body.type)
        Object.assign(query, { 'type': req.body.type });
    console.log(query)
    Blog.find(query).populate(['authorId','type']).sort({ 'createDate': 1 }).exec(function(err, blogs) {
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
exports.blogDetail = (req, res) => {
    // console.log('findByIdDetail')
    Blog.findById(req.body.id, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else
            res.status(200).json(client);
    }).populate(['authorId','type']);
}
exports.delBlog = (req, res) => {
    Blog.findByIdAndRemove(req.body.id, function(err, review) {
        if (err) {
            console.log(err)
            res.status(401).json(err);
        } else {
            res.status(200).json('successfull removed')
        }
    })
}
exports.findAllCategory = (req, res) => {
    // console.log(req.body.type)
    Blog.find({ 'type': req.body.type }, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else
            res.status(200).json(client);
    }).populate(['authorId','type']);
}
exports.add = (req, res)=>{
    Blog.findOne({ topic:''}).then(user => {
        if (user) {
            return res.status(400).json({ reviewName: "review already exists" });
        }  else {
            console.log(req.body)
            console.log(req.body.blogTags)
            const bridal = new Blog(req.body);
            if(!req.body.createDate)
            bridal.createDate = new Date().toString().slice(0,10);
            // bridal.createDate = Date.now().slice(0,10);
            else
                bridal.createDate = req.body.createDate;
            if(!req.body.viewCount)
                bridal.viewCount  = 5;
            else
                bridal.viewCount = req.body.viewCount;
            if(req.body.type)   bridal.type = req.body.type;
            if(req.body.topic) bridal.topic = req.body.topic;
            if(req.body.mainImg) bridal.mainImg = req.body.mainImg;
            if(req.body.mainCaptain) bridal.mainCaptain = req.body.mainCaptain;
            if(req.body.mainLink) bridal.mainLink = req.body.mainLink;
            if(req.body.blogTags){
                var tempBlogTagArr = JSON.parse(req.body.blogTags);
                bridal.blogTag = [];
                for(let i = 0; i<tempBlogTagArr.length; i++)
                    bridal.blogTag[i] = tempBlogTagArr[i];
            }

            if(req.body.subContentArr){
                var tempContentObj = JSON.parse(req.body.subContentArr);
                var tempTopicObj = JSON.parse(req.body.subTopicArr);
                var tempCaptainObj = JSON.parse(req.body.subCaptainArr);
                var tempImgObj = JSON.parse(req.body.imgArr);
                var tempImgLink = JSON.parse(req.body.subLinkArr);
                bridal.subParts = [];
                for(let i = 0; i< tempContentObj.length;i ++){
                    bridal.subParts[i]={
                        subContent:tempContentObj[i],
                        subTopic:tempTopicObj[i],
                        subImg:tempImgObj[i],
                        subCaptain:tempCaptainObj[i],
                        subLink:tempImgLink[i],
                    };
                }      
            }
            bridal.save((err) => {
                if (err) {
                    res.status(401).json(err);
                } else {
                    res.status(200).json({ result: 'successfully Updated!' });
                }
            })
        }
    });
}
// exports.uploadImgs = (req, res) => {
//     // Blog.find({ 'type': req.body.type }, function(err, client) {
//     //     if (!client)
//     //         res.status(500).send("data is not found");
//     //     else
//     //         res.status(200).json(client);
//     // }).populate('authorId');
//     console.log('>>>>>>> upload Img <<<<<<<<<<<<<')
//     // console.log(req.userId);
//     const files = req.files;
//     var mainImg, subImg = [];
//     // console.log(files);
//     console.log(req.body)
//     // console.log(req.body.type)
//     // console.log(req.body.mainContent)
//     // console.log(req.body.topic)
//     files.forEach((element, index) => {
//         if(index == 0){
//             // console.log(element)
//             mainImg = element.filename;
//         }else{
//             subImg.push({subImg: element.filename, subContent: req.body.subcontent[index - 1]})
//         }
//     });
//     if (!files) {
//         // const error = new Error('no file')
//         // error.httpStatusCode = 400
//         // return next(errr)
//         console.log('sss')
//     }
//     Blog.findOne({ type: '' }).then(user => {
//         if (user) {
//             return res.status(400).json({ reviewName: "review already exists" });
//         } else {
//             const user = new Blog(req.body);
//             user.subParts = subImg;
//             user.mainImg = mainImg;
//             user.createDate = Date.now();
//             user.save((err) => {
//                 if (err) {
//                     res.status(500).json(err);
//                 } else {
//                     res.status(200).json("Registered successfully");
//                 }
//             });
//         }
//     });
//     // return res.send({status:'ok'})
//     // res.send({ results: files });
//     // console.log(file);
// }
exports.uploadImg = (req, res, next) => {
    const file = req.file
    console.log(file.filename);
    if (!file) {
        console.log('sss')
    }
    console.log(file);
}
exports.createCategory = (req, res) => {
    Blogcategory.findOne({ name: req.body.name }).then(location => {
        if (location) {
            return res.status(400).json({ reviewName: "location already exists" });
        } else {
            const location = new Blogcategory(req.body);
            Blogcategory.countDocuments({}, function(err, c) {
                console.log('location count document')
                location.value = c;
                location.save((err) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json("Registered successfully");
                    }
                });
            })

        }
    });
};

exports.updateCategory = (req, res) => {
    Blogcategory.findOne({name:req.body.tempname}, function(err, client) {
        if (!client)
            res.status(500).send("data is not found");
        else {
            client.name = req.body.name;
            client.save().then(user => {
                    res.json('city updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });

};
exports.deleteCategory = (req, res) => {
    console.log('type');

};
exports.removeCategory = (req, res) => {
    console.log('remove')
    Blogcategory.findOneAndRemove({name:req.body.name}, function(err, city) {
        if (err) res.json(err);
        else{
            Blogcategory.countDocuments({}, function(err1, c) {
                console.log('c')
                console.log('location count document')
                Blogcategory.findOne({value:c}, function(err, client) {
                    if (!client)
                        res.status(500).send("data is not found");
                    else {
                        client.value = city.value;
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
exports.categoryList = (req, res) =>{
    Blogcategory.find({}, function(err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendor);
        }
    })
}