const express = require('express') //install
const fs = require('fs')//built-in
const path = require('path') //built-in
const socketIO = require('socket.io')
const http = require('http');

const pathPublic = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server); //provides a js library to use in browser as well. On localhost:3000/socket.io/socket.io.js

const {generateMessage} = require('./utils/message')

app.use(express.static(pathPublic)) //configure express to use the path to public

io.on('connection', function (socket) {
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat-app'))//welcome the user that just joined. only User will see it
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'User User Joined the chat'))//alert the chat that the User just joined. All  but User see it

  // socket.on('createMessage', function(message) {
  //   console.log(message)
  //   socket.emit('newMessage', message)
  // })
  //logs the message and emits it back to whomever sent it


  
  socket.on('createMessage', function(msg, callback) {
    io.emit('newMessage', generateMessage(msg.from, msg.text));
  callback();
  })
  //emits the message to everybody, includong the sender

  // socket.on('createMessage', function(msg, callback) {
  //   socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
  //   callback('This is from the server');
  // })
  //emits the message to everybody BUT the sender
  //sends callback back to the fron end and fires the third argument in the emit event; Acknowledgement. Callback takes 1 argument.
  //if we want to pass multiple data items we use object with multiple properties

  



  
  socket.on('disconnect', function () {
    console.log('User disconnected');    
  })
  
})



//configure the server
server.listen(port, () => {
  console.log(`Server up and listening on ${port}`);
})
