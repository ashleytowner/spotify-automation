"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var fs = require("fs");
var axios_1 = require("axios");
dotenv.config();
var app = express();
var port = 3000;
var callback = "http://localhost:" + port + "/";
app.get('/', function (req, res) {
    var data = {
        grant_type: 'authorization_code',
        redirect_uri: encodeURIComponent('http://localhost:3000/'),
        code: req.query.code
    };
    var body = Object.keys(data).map(function (key) { return key + "=" + data[key]; }).join('&');
    axios_1["default"].post("https://accounts.spotify.com/api/token", body, {
        headers: {
            Authorization: "Basic " + process.env.ENCODED_CLIENT
        }
    }).then(function (tkn) {
        fs.appendFile('./.env', "TOKEN=" + tkn.data.access_token, function () { return console.log('There was an error'); });
        res.send('You may now close this window');
    })["catch"](function (err) {
        res.status(500).send("Something went wrong");
        console.error(err.message);
    })["finally"](function () {
        runningApp.close();
    });
});
var scopes = encodeURIComponent('user-library-read user-read-private playlist-read-private');
var runningApp = app.listen(port, function () {
    console.log('Click this link and log into spotify:');
    console.log("https://accounts.spotify.com/authorize?response_type=code&client_id=" + process.env.CLIENT_ID + "&redirect_uri=" + callback + "&scope=" + scopes);
});
