var mongoose = require('mongoose');

module.exports = async() => {
    return mongoose.connect('mongodb+srv://pixify:QoYZ5d43K4@m1H2Ma@cluster0-hkahd.mongodb.net/stockVersion2', { useNewUrlParser: true, useUnifiedTopology: true })
    // return mongoose.connect('mongodb+srv://SuperPunch:rams1998727@cluster0-tkxxn.mongodb.net/Stock', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB successfully connected"))
        .catch(err => console.log(err));
};