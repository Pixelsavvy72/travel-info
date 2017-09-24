let socket = io();
socket.on('connect', () => {
    console.log('Connection made to server.');

});

socket.on('newMessage', function(newMessageData) {
    console.log('newMessage', (newMessageData))
}); 

socket.on('disconnect', function() {
    console.log('Connection to server dropped.');
})