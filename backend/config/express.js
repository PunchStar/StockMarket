var bodyParser = require('body-parser'),
    express = require('express'),
    passport = require('passport'),
    path = require('path');
var cors = require('cors');
module.exports = () => {
    var app = express();
    // for parsing application/json
    app.use(bodyParser.json());
    // for parsing application/xwww-
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../build")));
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());
    // if (app.get('env') === 'development') {
    //     app.use(function(err, req, res, next) {
    //         res.status(err.status || 500);
    //         res.render('error', {
    //             message: err.message, 
    //             error: err
    //         });
    //      });
    //  }

    // app.set("view engine", "ejs");
    // routes
    require('../routes/index')(app);
    require('../routes/User.routes')(app);
    // require('../routes/Client.routes')(app);
    // require('../routes/Vendor.routes')(app);
    // require('../routes/ClientRequest.routes')(app);
    // require('../routes/Lead.routes')(app);
    // require('../routes/Review.routes')(app);
    // require('../routes/Blog.routes')(app);
    // require('../routes/Location.routes')(app);
    // require('../routes/Payment.routes')(app);
    // require('../routes/Favourite.routes')(app);
    // require('../routes/Owner.routes')(app);
    // require('../routes/Area.routes')(app);
    // require('../routes/Semail.routes')(app);
    // require('../routes/Make.routes')(app);
    // require('../routes/Model.routes')(app);
    // require('../routes/Ticket.routes')(app);
    // require('../routes/Ad.routes')(app);
    // if(process.env.NODE_ENV === "development")
    // {
    //     // CORS rquests
    //     // app.use("/", (req, res, next) => {
    //     //     res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    //     //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept, Authorization");
    //     //     next();
    //     // });
    //     //   app.get('*',(req,res)=>{
    //     // res.sendFile(path.join(__dirname, '../build','index.html'));
    // });

    // }  
    return app;
};