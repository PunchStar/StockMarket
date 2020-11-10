var dotenv = require('dotenv'),
    Express = require('./config/express'),
    Mongoose = require('./config/mongoose'),
    MongoDB = require('./config/mongodb'),
    Passport = require('./config/passport');
    // Passport_vendor = require('./config/passport_vendor');



dotenv.config();    
var mongo = MongoDB();
var mongoose = Mongoose();
var server = Express();
var passport = Passport();
// var Passport_vendor = Passport_vendor();
// var port = process.env.SERVER_PORT;
var port = process.env.PORT || 5000;
// var port = 5000;
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
