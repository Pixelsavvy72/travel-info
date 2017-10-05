const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 7777;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('A new connection has been made with a client.');

    // ADMIN MESSAGES
    socket.emit('newMessage', generateMessage('Admin', 'You have connected to the messaging service.'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','A new user has joined.'));

    // USER TO USER MESSAGES
    socket.on('createMessage', (createMessageData, callback) => {
        console.log('newMessage', createMessageData);

        io.emit('newMessage', generateMessage(createMessageData.from, createMessageData.text));

        callback('This is acknowledgement from the server.');

    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.long));
    });



    socket.on('disconnect', () => {
        console.log('The connection to the client has been dropped.');
    });
});


server.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});