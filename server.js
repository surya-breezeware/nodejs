const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// routes

const one = (res, req, next) => {
  console.log("one");
  next();
};
const two = (res, req, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain", [one, two, three]);

app.listen(3500, () => {
  console.log("server running");
});
