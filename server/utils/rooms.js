class Rooms {
    constructor() {
        this.rooms = [];
    }

    addRoom(roomName, travelRoute) {
        var room = {roomName, travelRoute};
        this.rooms.push(room);
        return room;
    }

    getRoom(roomName) {
        return this.rooms.filter((room) => room.roomName === roomName)[0];
    }

    


}

module.exports = {Rooms};