let socket = io();

socket.on('connect', function () {
   console.log('Çonnected to server');
 })
     

socket.on('disconnect', function () {
   console.log('Disconnected from server');
 })

socket.on('newMessage', function(message) {
   console.log('New Message: ', message)
   let formattedTime = moment(message.createdAt).format('DD MMM YYYY HH:mm')
   let li = jQuery('<li></li>')
   li.text(`${message.from} : ${message.text}, sent on ${formattedTime}`)

   jQuery('#messages-list').append(li)

 })

     
//add acknowledgement function as a third argument to an emitter
let messageTextbox = jQuery('[name=MessageText]')
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  })
})