require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require("../models/userModel");
const passport = require("passport");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        console.log("Google profile:", profile); // Log profile to inspect available fields
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) {
            return cb(new Error("Google account does not have an email associated"), null);
        }

        try {
            let user = await UserModel.findOne({ googleId: profile.id });
            if (!user) {
                user = await new UserModel({
                    name: profile.displayName,
                    email: email,
                    googleId: profile.id
                }).save();
            }
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }));


passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    UserModel.findById(id, function (err, user) {
        cb(err, user);
    });
})
