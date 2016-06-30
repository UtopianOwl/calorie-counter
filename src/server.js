var express = require("espress");
var app = express();
var bodyParser = require("body-parser");
var config = require("./config.js");
var cors = require("cors");
var expressJwt = require("express-jwt");
var mongoose = require("mongoose");
var morgan = require("morgan");
var path = require("path");
var port = process.env.PORT || 8000;

mongoose.connect(config.database, function() {
    console.log("Connection to MongoDB successful.")
});

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", expressJwt({secret: config.secret}));

app.use("/auth", require("./routes/authRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));

app.listen(port, function() {
    console.log("App is lisetening on Port" + port + ".")
});