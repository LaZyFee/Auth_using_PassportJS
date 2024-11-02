require("dotenv").config();
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const MongoStore = require("connect-mongo");
const passport = require("./config/passport");
const passportGoogleAuth = require("./config/passportGoogleAuth");
const flash = require("connect-flash");

const { register } = require("./controller/userController");
require("./config/db");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize session and passport configuration
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions"
        }),
    })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Middleware to make flash messages available in views
app.use((req, res, next) => {
    res.locals.errorMessages = req.flash("error");
    res.locals.successMessages = req.flash("success");
    next();
});

// Define routes
app.get("/", (req, res) => res.render("index"));
app.get("/register", (req, res) => res.render("register"));
app.post("/register", register);
app.get("/login", (req, res) => res.render("login"));

// Authenticate using Passport
app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}));

app.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("profile", { username: req.user.name });
    } else {
        res.redirect("/login");
    }
});


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/profile'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


app.get("/logout", (req, res) => {
    req.logout(() => {
        req.flash("success", "You have been logged out.");
        req.session.destroy();
        res.clearCookie("connect.sid");

        res.redirect("/");
    });
});

module.exports = app;
