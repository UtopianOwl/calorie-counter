var express = require("express");
var mealRouter = express.Router();
var Meal = require("../models/meal");

mealRouter.route("/")
    .get(function (req, res) {
        Loan.find({user: req.user._id}, function (err, meals) {
            if (err) res.status(500).send(err);
            else res.send(meals);
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

mealRouter.route("/:mealId")
    .get(function (req, res) {
        Loan.findOne({_id: req.params.mealId, user: req.user._id}, function (err, meal) {
            if (err) res.status(500).send(err);
            else res.send(meal);
        });
    })
    .put(function (req, res) {
        Loan.findOneAndUpdate({_id: req.params.mealId, user: req.user._id}, req.body, {new:true}, function(err, meal) {
            if (err) res.send(500).send(err);
            else res.send(meal);
        });
    })
    .delete(function (req, res) {
        Loan.findOneAndRemove({_id: req.params.mealId, user: req.user._id}, function(err, meal) {
            if (err) res.status(500).send(err);
            else res.send(meal);
        });
    });

module.exports = mealRouter;
