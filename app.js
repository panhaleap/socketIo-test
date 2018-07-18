const expresses = require("express");
const app = expresses();
const port = process.env.port || 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);
const users = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("A user connected");
  socket.on("setUsername", function(data) {
    console.log(data);

    if (users.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });

  socket.on("msg", function(data) {
    //Send message to everyone
    io.sockets.emit("newmsg", data);
  });

  // User typing event
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
});
});

http.listen(port, function() {
  console.log(`Listening to port ${port}`);
});
