import { WebSocket } from "ws";

const ws = new WebSocket("ws://localhost:5000");

ws.on("error", err => {
  console.error("Exit with error", err.message);
});

ws.on("message", data => {
  console.log(data);
});

ws.on("close", (code, reason) => {
  console.log(`Connection closed with ${reason} reason and ${code} code`);
});

ws.on("open", () => {
  console.log("Opened ws connection");
  try {
    ws.send("Hi server", err => {
      if (err) {
        throw err;
      }
    });

    ws.close();
  } catch (err) {
    console.error(err);
  }
});
