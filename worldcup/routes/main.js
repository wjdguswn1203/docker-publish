const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { hostname } = require("os");
const mongoClient = require("mongodb").MongoClient;
const env = require("dotenv").config({path:"../.env"});

const app = express();
app.use(morgan("dev"));

HOST = process.env.MongoDB_Hostname;
USERNAME = process.env.MongoDB_Username;
PASSWORD = process.env.MongoDB_Password;


var db;
var databaseUrl = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:27017`;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./index.html");
});

app.get("/worldcup", (req, res) => {
  console.log(mongoClient);
  mongoClient.connect(databaseUrl, function (err, database) {
    if (err != null) {
      res.json({ count: 0 });
      console.log(err);
    } else {
      db = database.db("test");
      db.collection("worldcup")
        .find({}, { _id: 0, no: 1, nation: 1, date: 1 })
        .toArray(function (err, result) {
          if (err) throw err;
          console.log("result: ");
          console.log(result);
          //   res.json(result);
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          var template = `
            <table border = "1" margin:auto; text-align:center;>
            <tr>
                <th>no</th>
                <th>nation</th>
                <th>date</th>
            </tr>`;
          result.forEach((item) => {
            template += `
                <tr>
                    <td>${item.no}</td>
                    <td>${item.nation}</td>
                    <td>${item.date}</td>
                </tr>`;
          });
          template += `</table>`;
          res.end(template);
        });
    }
  });
});

module.exports = app;