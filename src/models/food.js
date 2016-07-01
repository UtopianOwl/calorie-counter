var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    food_id: {
        type: Number,
        required: true
    },
    food_name: {
        type: String,
        required: true
    },
    food_type: {
        type: String,
        required: true
    },
    brand_name: String,
    serving_id: {
        type: String,
        required: true
    },
    serving_description: {
        type: String,
        required: true
    },
    metric_serving_amount: {
        type: Number,
        required: true
    },
    metric_serving_unit: {
        type: Number,
        required: true
    },
    number_of_units: {
        type: Number,
        required: true
    },
    measurement_description: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model