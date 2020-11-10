var mongoose = require('mongoose');

module.exports = async() => {
    return mongoose.connect('mongodb+srv://pixify:QoYZ5d43K4@m1H2Ma@cluster0-hkahd.mongodb.net/stock', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};