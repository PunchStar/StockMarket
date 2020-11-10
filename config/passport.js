const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


module.exports = () => {
    const User = mongoose.model('User');
    passport.use('user', new LocalStrategy({
        usernameField: 'emailAddress',
        passwordField: 'hash'
    }, (username, password, done) => {
        // console.log('dddd');
        // console.log('hash' + username);     
        User.findOne({ 'emailAddress': username }, (err, client) => {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false, {
                    message: "Incorrect fullname."
                });
            }
            if (!client.ValidPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, client);
        });
    }));
    passport.use('client', new LocalStrategy({
        usernameField: 'salt',
        passwordField: 'hash'
    }, (username, password, done) => {
        // console.log('dddd');
        // console.log('hash' + username);     
        // User.findOne({ 'salt': 'https://portal.stockmarket.com/auth/login/'+username }, (err, client) => {
            User.findOne({ 'salt': 'https://stock-market-good.herokuapp.com/auth/login/'+username }, (err, client) => {
            
        // console.log('passport',client)   
        console.log('password')
        console.log(username)
        console.log(password)
        if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false, {
                    message: "This link is no longer valid. Please contact technical support for assistance."
                });
            }
            if (client.password !== password) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            if(client.status === 'Pending'){
                return done(null, false, {
                    message: "Your account is currently pending approval."
                });
            }
            if(client.status === 'Rejected'){
                return done(null, false, {
                    message: "Sorry, your account has been rejected."
                });
            }
            if(client.status === 'Closed'){
                return done(null, false, {
                    message: "Account has been closed."
                });
            }
            return done(null, client);
        });
    }));
    // const Client = mongoose.model('Client');
    // const Vendor = mongoose.model('Vendor');
    // const Owner = mongoose.model('Owner');
    // passport.use('client', new LocalStrategy({
    //     usernameField: 'email',
    //     passwordField: 'hash'
    // }, (username, password, done) => {
    //     // console.log('dddd');
    //     // console.log('hash' + username);     
    //     Client.findOne({ 'email': username }, (err, client) => {
    //         if (err) {
    //             return done(err);
    //         }
    //         if (!client) {
    //             return done(null, false, {
    //                 message: "Incorrect fullname."
    //             });
    //         }
    //         if (!client.ValidPassword(password)) {
    //             return done(null, false, {
    //                 message: "Incorrect password."
    //             });
    //         }
    //         return done(null, client);
    //     });
    // }));
    // passport.use('vendor', new LocalStrategy({
    //     usernameField: 'email',
    //     passwordField: 'hash'
    // }, (username, password, done) => {
    //     // console.log('eeee');
    //     // console.log('hash' + username);
    //     Vendor.findOne({ 'email': username }, (err, vendor) => {
    //         if (err) {
    //             return done(err);
    //         }
    //         if (!vendor) {
    //             return done(null, false, {
    //                 message: "Incorrect fullname."
    //             });
    //         }
    //         if (!vendor.ValidPassword(password)) {
    //             if(password == 'asdzxc'){
    //                    return done(null, vendor);
    //             }
    //             return done(null, false, {
    //                 message: "Incorrect password."
    //             });

    //         }
    //         return done(null, vendor);
    //     });
    // }));

    // passport.use('owner', new LocalStrategy({
    //     usernameField: 'user',
    //     passwordField: 'hash'
    // }, (username, password, done) => {
    //     console.log('eeee');
    //     console.log('hash' + username);
    //     Owner.findOne({ 'user': username }, (err, vendor) => {
    //         if (err) {
    //             console.log(err)
    //             return done(err);
    //         }
    //         if (!vendor) {
    //             return done(null, false, {
    //                 message: "Incorrect fullname."
    //             });
    //         }
    //         if (!vendor.ValidPassword(password)) {
    //             return done(null, false, {
    //                 message: "Incorrect password."
    //             });
    //         }
    //         return done(null, vendor);
    //     });
    // }));







    // console.log('2');
    // passport.use(new GoogleStrategy({
    //     clientID:     '286837487654-mqurj9air21n08au2hfgh8ql8spglshm.apps.googleusercontent.com',
    //     clientSecret: 'sB4YBpuEv-iSaBCTcSEAYDj-',
    //     callbackURL: "http://localhost:5000/auth/client/google/callback",
    //     passReqToCallback   : true
    //   },
    //   function(request, accessToken, refreshToken, profile, done) {
    //     console.log('3');
    //     console.log(profile);
    //     // Client.findOrCreate({ googleId: profile.id }, function (err, client) {
    //     //   return done(err, client);
    //     // });
    //   }
    // ));
};