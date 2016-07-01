var express = require("express");
var foodRouter = express.Router();
var Food = require("../models/food");

foodRouter.route("/")
    .get(function (req, res) {
        Loan.find({user: req.user._id}, function (err, foods) {
            if (err) res.status(500).send(err);
            else res.send(foods);
        });
    })
    .post(function (req, res) {
        var newLoan = new Loan(req.body);
        newLoan.user = req.user._id;
        newLoan.save(function(err, user) {
            if(err) res.status(500).send(err);
            else res.status(201).send(user);
        });
});

foodRouter.route("/:foodId")
    .get(function (req, res) {
        Loan.findOne({_id: req.params.foodId, user: req.user._id}, function (err, food) {
            if (err) res.status(500).send(err);
            else res.send(food);
        });
    })
    .put(function (req, res) {
        Loan.findOneAndUpdate({_id: req.params.foodId, user: req.user._id}, req.body, {new:true}, function(err, food) {
            if (err) res.send(500).send(err);
            else res.send(food);
        });
    })
    .delete(function (req, res) {
        Loan.findOneAndRemove({_id: req.params.foodId, user: req.user._id}, function(err, food) {
            if (err) res.status(500).send(err);
            else res.send(food);
        });
    });

module.exports = foodRouter;
