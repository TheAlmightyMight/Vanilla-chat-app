const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

const arr = [];

app.use("/", (req, res, next) => {
  console.log("yay");
  next();
});

const isAuthenticated = (req, res, next) => {
  console.log(arr);
  const cookie = arr.find((el) => el.name === req.headers.cookie.name);

  if (cookie) {
    next();
  } else {
    res.send("Not authroized").status(401);
  }
};

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/auth", (req, res) => {
  console.log(req.headers.cookie);
  res.cookie("rememberme", "1", {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    sameSite: true,
  });
  arr.push({ rememberme: "1" });
  res.end();
});

app.get("/private", isAuthenticated, (req, res) => {
  console.log(req.headers.cookie);
  res.send("Private route");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
