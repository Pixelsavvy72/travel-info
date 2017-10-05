class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    // Get a list of users that belong to the spec'd room.
    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let userNamesArray = users.map((user) => user.name);

        return userNamesArray;
    }
}

module.exports = {Users};