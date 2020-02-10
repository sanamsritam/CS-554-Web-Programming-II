const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  console.log("============LOGGER============\n");
  console.log("Request BODY: ", req.body);
  console.log("Request URL: ", req.originalUrl);
  console.log("Request HTTP VERB: ", req.method);
  console.log("==========LOGGER_END==========\n");
  next();
});
let total = 0;
let path = {};

app.use(function(req, res, next) {
  console.log("============URL_LOGGER============\n");
  if (
    path[req.protocol + "://" + req.get("host") + req.originalUrl] == undefined
  ) {
    path[req.protocol + "://" + req.get("host") + req.originalUrl] = 1;
  } else {
    path[req.protocol + "://" + req.get("host") + req.originalUrl]++;
  }
  total++;
  console.log("Total no of requests: " + total);
  for (i in path) {
    console.log("URL: " + i + "   count:" + path[i]);
  }
  //   console.log("URLs: " + path);
  console.log("==========URL_LOGGER_END==========");
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
