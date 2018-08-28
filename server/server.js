const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname,'../public');
var port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
  console.log('new user connected');
  socket.emit('newMessage',{
    from:'John',
    text:'See you then',
    createAt:123123
  });
  socket.on('createMessage',(message)=>{
    console.log("createMessage",message);
  });
  socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });
});
server.listen(port,()=>{
  console.log(`started on port ${port}`);
})
