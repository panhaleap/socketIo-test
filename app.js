const expresses = require("express");
const app = expresses();
const port = process.env.port || 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });

    socket.on('typing', function(handler){
        socket.broadcast.emit('typing', handler);
    });
  });

http.listen(port, function() {
  console.log(`Listening to port ${port}`);
});
