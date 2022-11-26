const http = require("http");
const server = http.Server();

const agent = new http.Agent({ keepAlive: true });

server.on("connection", () => {
  console.log("Connection...");
});

server.on("request", (req, res) => {
  res.writeHead(200, {
    ["Connection"]: "Keep-Alive",
    "Keep-Alive": "timeout=5, max=1000",
  });
  res.write("Hello there!");
  res.end();
});

server.listen(5000, () => console.log("Listening"));

// const net = require("node:net");
// const server = net.Server();
// const port = 5000;

// server.listen(port, "localhost", () => {
//   console.log(`Listens on ${port}`);
// });

// server.on("connection", () => {
//   console.log("Connected to someone");
// });

// server.on("connect")
