const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');
var publicPath = path.join(__dirname,'../public');
var port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
  console.log('new user connected');
  socket.broadcast.emit('newMessage',generateMessage("Admin","New user joined"));
  socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app"));
  socket.on('createMessage',(message)=>{
    console.log("createMessage",message);
    io.emit('newMessage',generateMessage(message.from,message.text));
  });
  socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });
});
server.listen(port,()=>{
  console.log(`started on port ${port}`);
})
