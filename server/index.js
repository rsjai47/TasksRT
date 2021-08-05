const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");
const { addUser, removeUser, getUser } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(router);
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected !!");

  socket.on("login", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      console.log(error);
      callback(error);
    }
    socket.broadcast.to(user.room).emit("newUserJoined", socket.id);

    socket.join(user.room);
  });

  socket.on("sendTodoInit", (todo, id) => {
    io.to(id).emit("todo", todo);
  });

  socket.on("sendTodo", (todo) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("todo", todo);
  });

  socket.on("disconnect", () => {
    const userQuit = removeUser(socket.id);
    console.log(`user disconnected !!`);
  });
});

server.listen(PORT, () => {
  console.log(`server is up and running in port ${PORT}`);
});

// s̶o̶l̶v̶e̶ i̶f̶ n̶o̶ n̶a̶m̶e̶ o̶r̶ v̶a̶l̶u̶e̶ i̶s̶ g̶i̶v̶e̶n̶
// i̶m̶p̶l̶e̶m̶e̶n̶t̶ l̶o̶g̶ o̶u̶t̶
// c̶h̶e̶c̶k̶ a̶l̶l̶ t̶h̶e̶ e̶r̶r̶o̶r̶ c̶a̶s̶e̶s̶ -̶ i̶f̶ n̶o̶ n̶a̶m̶e̶
// i̶m̶p̶l̶e̶m̶e̶n̶t̶ l̶o̶c̶a̶l̶s̶t̶o̶r̶a̶g̶e̶
// c̶h̶e̶c̶k̶ i̶f̶ u̶ n̶e̶e̶d̶ g̶e̶t̶U̶s̶e̶r̶s̶I̶n̶R̶o̶o̶m̶ v̶a̶l̶u̶e̶
// L̶o̶g̶i̶n̶ U̶I̶
// c̶h̶a̶n̶g̶e̶ d̶a̶r̶k̶ m̶o̶d̶e̶ t̶o̶ c̶l̶a̶s̶s̶
// i̶m̶p̶l̶e̶m̶e̶n̶t̶ t̶a̶g̶ r̶o̶o̶m̶
// i̶m̶p̶l̶e̶m̶e̶n̶t̶ c̶r̶e̶a̶t̶e̶ r̶o̶o̶m̶
// d̶a̶r̶k̶m̶o̶d̶e̶ d̶o̶u̶b̶l̶e̶ c̶l̶i̶c̶k̶ i̶s̶s̶u̶e̶
// c̶h̶a̶n̶g̶e̶ a̶l̶l̶ l̶o̶c̶a̶l̶ h̶o̶s̶t̶s̶ t̶o̶ d̶i̶f̶f̶e̶r̶e̶n̶t̶ d̶o̶m̶a̶i̶n̶s̶ b̶e̶f̶o̶r̶e̶ d̶e̶p̶l̶o̶y̶i̶n̶g̶
// r̶e̶m̶o̶v̶e̶ a̶l̶l̶ c̶o̶n̶s̶o̶l̶e̶ l̶o̶g̶s̶
// c̶h̶e̶c̶k̶ o̶n̶ u̶r̶ p̶h̶o̶n̶e̶ (̶l̶t̶)̶
