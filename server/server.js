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

io.on('connection', (socket) => {
  // console.log('New user connected');
  // socket.emit('newMessage', {from: "Onzi", text: "O, tozi!"})

  // socket.on('createMessage', function(message) {
  //   console.log(message)
  //   socket.emit('newMessage', message)
  // })

  socket.on('createMessage', function(msg) {
    io.emit('newMessage', msg);
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');    
  })
  
})



//configure the server
server.listen(port, () => {
  console.log(`Server up and listening on ${port}`);
})
