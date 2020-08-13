const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("dist"));

app.use("/", (req, res, next) => {
  res.send({ message: "Hello baby" });
});
const server = http.createServer(app);
const io = socket(server, { path: "/socket" });

const colors = ["red", "green", "blue"];
let index = 0;
io.on("connection", (socket) => {
  const User = {
    id: socket.id,
    color: colors[index],
  };
  index = (index + 1) % colors.length;

  socket.emit("Your id", User);
  socket.on("onDrawing", (body) => {
    io.emit("Drawing", body);
  });
});

server.listen(8000, () => console.log("Server is running on port 8000"));
