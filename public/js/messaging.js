let socket = io();
socket.on('connect', () => {
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href='/';
        } else {
            console.log('New user joined.')
        }
    });
});

socket.on('newMessage', function(newMessageData) {
    let formattedTime = moment(newMessageData.createdAt).format('h:mm a');

    // Add list item message to insert into html
    let li = jQuery('<li></li>');
    li.text(`${newMessageData.from} ${formattedTime}: ${newMessageData.text}`);

    jQuery('#messageList').append(li);

}); 

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let eachLi = jQuery('<li></li>');
    let anchor = jQuery('<a target="_blank">My Current Location</a>');

    eachLi.text(`${message.from} ${formattedTime}: `);
    anchor.attr('href', message.url);
    eachLi.append(anchor);

    jQuery('#messageList').append(eachLi);

});


socket.on('disconnect', function() {
    console.log('Connection to server dropped.');
})

// Create a message
jQuery("#messageForm").on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=messageInput]').val()
    }, function () {

    });
});

// Geolocation

let locationButton = jQuery('#shareLocationButton');

locationButton.on('click', function () {
    // Check if geolocation is available
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    };
    
    // Set position or send warning if geolocation denied by user
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });

    }, function () {
        alert('Unable to fetch location.');
    });
});