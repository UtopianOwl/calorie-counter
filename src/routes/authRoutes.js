var express = require("express");
var authRouter = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var config = require("../config");
var User = require("../models/user");

authRouter.post("/login", function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) res.status(500).send(err);
        else if (!user) res.status(401).send({
            success: false,
            message: "No user found matching the provided username."
        });
        else {
            bcrypt.compare(req.body.password, user.password, function (err, match) {
                if (err) res.status(500).send(err);
                else if (!match) res.status(401).send({
                    success: false,
                    message: "Incorrect passeord."
                });
                else {
                    var token = jwt.sign(user.toObject(), config.secret);
                    res.send({
                        success: true,
                        token: token,
                        user: user.withoutPassword(),
                        message: "Successful login, here is your token!"
                    });
                }
            });
        }
    });
});

authRouter.post("/signup", function (req, res) {
    User.findOne({username: req.body.username}, function (err, existingUser) {
        if (err) res.status(500).send(err);
        else if (existingUser) res.status(401).send({success: false, message: "That username is already taken."});
        else {
            var newUser = new User(req.body);
            newUser.save(function (err, user) {
                if (err) res.status(500).send(err);
                else res.send({
                    success: true,
                    user: user,
                    message: "Successfully created new user"});
            });
        }
    });
});

authRouter.put("/edit/:userId", function (req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, {new:true}, function(err, user) {
        if (err) res.status(500).send(err);
        else {
            res.send(user);   
        }
    });
});

module.exports = authRouter;