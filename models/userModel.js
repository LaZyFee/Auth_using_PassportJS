const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("User", userSchema);
