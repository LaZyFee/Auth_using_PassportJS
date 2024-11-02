const express = require("express");
const session = require("express-session");
const ejs = require("ejs");


const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
    res.render("index")
})




module.exports = app;