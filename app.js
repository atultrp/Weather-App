const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
var _ = require('lodash');

const app = express();

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home");
});

// app.get("/", function(req, res) {

//     res.sendFile(__dirname + "/New/index2.html");

// });


app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "473a275db6de039a61021711999f0dd5";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const weatherImageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>Temperature of " + query + " is " + temp + " deg Celcius.</h1>");
            res.write("<p>The weather is currently  " + weatherDescription + "</p>");
            res.write("<img src=" + weatherImageUrl + ">");

            res.send();
        });

    });

});



app.listen(3000, function() {
    console.log("Server is running on port 3000");
});