const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 7777;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('A new connection has been made with a client.');

    socket.emit('newMessage', {
        from: "user1",
        text: "Sample text from server",
        createdAt: 000000000
    });

    socket.on('createMessage', (createMessageData) => {
        console.log('newMessage', createMessageData);
    })



    socket.on('disconnect', () => {
        console.log('The connection to the client has been dropped.');
    });
});


server.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});