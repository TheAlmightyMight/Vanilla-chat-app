const $ = document;

const ws = new WebSocket("ws://localhost:5000");
const list = $.querySelector(".list");
const btnClose = $.querySelector("#btn");
const input = $.querySelector("#input");
const form = $.querySelector("#form");

form.addEventListener("submit", e => {
  e.preventDefault();
  ws.send(input.value);
});

btnClose.addEventListener("click", e => {
  ws.close();
});

ws.addEventListener("open", e => {
  console.log(`Opened a connection: ${e.type}`);
});

ws.addEventListener("message", event => {
  const data = JSON.parse(event.data).message;
  console.log(data);
  list.innerHTML = "";
  data.forEach(el => {
    const li = $.createElement("li");
    li.textContent = el;
    list.append(li);
  });
});

ws.addEventListener("close", event => {
  console.log("Closed connection");
});

ws.addEventListener("error", err => {
  console.error(err.message);
  console.log(err);
});
