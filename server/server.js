const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 7777;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('A new connection has been made with a client.');

    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }
        
        socket.join(params.room); // user joins room
        users.removeUser(socket.id); // user removed from prev rooms
        users.addUser(socket.id, params.name, params.room); // User is add to new room

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        // ADMIN MESSAGES
        socket.emit('newMessage', generateMessage('Admin', 'You have connected to the messaging service.'));
        socket.broadcast.emit('newMessage', generateMessage('Admin', `${params.name} has joined the room.`));

        callback();
    });

    // USER TO USER MESSAGES
    socket.on('createMessage', (createMessageData, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(createMessageData.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, createMessageData.text));
        }

        callback();

    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.long));
    });



    socket.on('disconnect', () => {
        console.log('The connection to the client has been dropped.');
    });
});


server.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});