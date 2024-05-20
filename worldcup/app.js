"use strict";

var express = require("express");
const app = express();

const HOST = "0.0.0.0";
const PORT = 8000;

var main = require("./routes/main.js");

app.use(express.static(__dirname + "/public"));
app.use("/", main);

app.listen(PORT, HOST);
console.log(`Server running at http://${HOST}:${PORT}/`);
