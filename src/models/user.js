var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema ({
   name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    age: Number,
    height: Number,
    weight: Number,
    gender: String,
    goal: String
});

module.exports = mongoose.model("User", userSchema);