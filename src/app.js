const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("join-room", (id_1, id_2) => {
    const arr = [id_1, id_2];
    arr.sort();
    const id = arr.join("-");
    socket.join(id);
    console.log(id);

    socket.on("message-sent", (message) => {
      // db store sender receiver message Date.now();

      socket.to(id).emit("message-received", message);
      console.log(message);
    });
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
