const https = require("https");

const url = new URL("https://jsonplaceholder.typicode.com/todos/1");
console.log(url.protocol);

// const req = https.request(
//   {
//     hostname: "jsonplaceholder.typicode.com",
//     port: 443,
//     path: "/todos/1",
//     method: "GET",
//   },
//   (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(res.headers);
//     res.setEncoding("utf8");

//     res.on("data", (chunk) => {
//       console.log(`Received a chunk of data ${chunk}`);
//     });

//     res.on("error", (err) => {
//       console.error(err.message);
//     });

//     res.on("end", () => {
//       console.log("Request finished");
//     });
//   }
// );

// req.on("error", (e) => {
//   console.error(e);
// });

// req.end();
