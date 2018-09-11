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


app.use(express.static(pathPublic)) //configure express to use the path to public

io.on('connection', function (socket) {
  socket.emit('newMessage', {from: 'Admin', text: 'Welcome User'})//welcome the user that just joined. only User will see it
  socket.broadcast.emit('newMessage', {text: 'User joined the chat'})//alert the chat that the User just joined. All  but User see it

  // socket.on('createMessage', function(message) {
  //   console.log(message)
  //   socket.emit('newMessage', message)
  // })
  //logs the message and emits it back to whomever sent it


  
  // socket.on('createMessage', function(msg) {
  //   io.emit('newMessage', msg);
  // })
  //emits the message to everybody, includong the sender

  socket.on('createMessage', function(msg) {
    socket.broadcast.emit('newMessage', msg);
  })
  //emits the message to everybody BUT the sender

  



  
  socket.on('disconnect', function () {
    console.log('User disconnected');    
  })
  
})



//configure the server
server.listen(port, () => {
  console.log(`Server up and listening on ${port}`);
})
