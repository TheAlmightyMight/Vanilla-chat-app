import { WebSocketServer } from "ws";
import fs from "fs/promises";

process.on("uncaughtException", err => {
  console.error(
    "An error occurred \n",
    "-------------------------------------------------------------------------------------------- \n",
    `Name: ${err.name} \n`,
    `Message: ${err.message} \n`,
    `Stack: ${err.stack} \n`,
  );
});

const server = new WebSocketServer({ port: 5000 }, () => {
  console.log(`Listening at ${5000}`);
});

server.on("connection", (ws, req) => {
  ws.on("message", data => {
    console.log(data.toString(), "data received");
    fs.writeFile("files/data.txt", data, { encoding: "ascii" }).then(() => {
      ws.close();
    });
    ws.close();
  });

  ws.on("close", () => {
    console.log("Closed a connection");
  });
});
