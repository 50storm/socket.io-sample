// npm install --save express@4.15.2
// npm install --save socket.io

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  // console.log(socket);
    io.emit("chat message", "Hi! New User!")  //送信元含む全員に送信
    socket.on('chat message', function(msg){
        io.emit('chat message', msg); //送信元含む全員に送信
        // socket.broadcast.emit("chat message", msg)　//送信元以外の全員に送信
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

