let socket = io();
socket.on('connect', () => {
    console.log('Connection made to server.');

    socket.emit('createMessage', {
        from: "User2",
        text: "Sample text from client"
    });

});

socket.on('newMessage', function(newMessageData) {
    console.log('newMessage', (newMessageData))
}); 

socket.on('disconnect', function() {
    console.log('Connection to server dropped.');
})