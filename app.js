const expresses = require("express");
//const bodyParser = require("body-parser");
const app = expresses();
const port = process.env.port || 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


 io.on('connection', function(socket){
    console.log('a user connected');
  });
  
  http.listen(port, function(){
    console.log(`Listening to port ${port}`);
  });
