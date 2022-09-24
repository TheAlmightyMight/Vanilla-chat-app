const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
