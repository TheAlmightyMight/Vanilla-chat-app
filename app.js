const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const event = require("node:events");

class Logger extends event.EventEmitter {
  constructor() {
    super();
    this.messages = [];
  }

  log(...messages) {
    this.emit("log", messages);
  }
}

const logger = new Logger();

logger.on("log", (args) => {
  args.forEach((el) => {
    console.log(
      el ?? "Request object was not populated with the provided property"
    );
  });
});

app.use("/", (req, res, next) => {
  logger.log(req.body, req.params);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/page/:id", (req, res) => {
  res.send(`Hello page number ${req.params.id}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
