'use strict';

const express = require('express');
const router = express.Router();

const authHandler = require('../../controllers/userControllerLogin');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const gcl_id = process.env.GOOGLE_CLIENT_ID;
const gcl_secret = process.env.GOOGLE_CLIENT_SECRET;

var passport = require('passport');
var userProfile;

router.use(passport.initialize());

passport.use(new GoogleStrategy({
        clientID: gcl_id,
        clientSecret: gcl_secret,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, done){
        return done(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb){
    cb(null, obj);
});

router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/error', authHandler.googleFailed);

router.get('/callback', passport.authenticate('google', {failureRedirect: '/api/v1/auth/google/error'}), authHandler.google);

module.exports = router;