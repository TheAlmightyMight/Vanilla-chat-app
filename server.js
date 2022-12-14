import { WebSocketServer } from "ws";
import * as dotenv from "dotenv";
import fs from "fs/promises";
dotenv.config();

process.on("uncaughtException", err => {
  console.error(
    "An error occurred \n",
    "------------------------------------------------------------------------------------------------------------------------------------------------------------ \n",
    `Name: ${err.name} \n`,
    `Message: ${err.message} \n`,
    `Stack: ${err.stack} \n`,
  );
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------

const server = new WebSocketServer({ port: process.env.PORT });

server.on("connection", (ws, req) => {
  ws.on("open", () => {
    console.log("Websocket has opened...");
  });

  ws.on("message", async data => {
    console.log(`Data received: ${data.toString()}`);
    await fs.writeFile("files/data.txt", data, { encoding: "ascii" });
    ws.close();
  });

  ws.on("error", err => {
    if (err) {
      console.log(
        `Websocket error: Stack: Name: \n ${err.name} Message: ${err.message} \n ${err.stack}`,
      );
    }
  });

  ws.on("unexpected-response", (req, res) => {
    console.log("An unexpected response has been received");
    console.log(req);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.write("Unexpected response");
  });

  // Can be used for auth
  // ws.on("upgrade", (req) => {

  // });

  ws.on("close", () => {
    console.log("Closed a connection");
  });
});

server.on("close", () => {
  console.log("Websocket server has finished serving...");
});

server.on("error", err => {
  console.log(
    `Name: ${err.name} \n`,
    `Message: ${err.message} \n`,
    `Stack: ${err.stack} \n`,
  );
});

server.on("listening", () => {
  console.warn(`Server is now listening to port ${process.env.PORT}`);
});

// server.on("headers", (headers, req) => {
//
// });
