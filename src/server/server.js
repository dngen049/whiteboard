const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("dist"));

app.use("/api/hello", (req, res, next) => {
  res.send({ message: "Hello world" });
});
const server = http.createServer(app);
// const io = socket(server);

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.emit("Your id", socket.id);
//   socket.on("send message", (body) => {
//     io.emit("message", body);
//   });
// });

server.listen(8000, () => console.log("Server is running on port 8000"));
