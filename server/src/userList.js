import _ from "lodash";

class UserList {
    constructor() {
        this.presentUsers = {};
    }

    // add a new id-nickname-pair to the list
    add(id, nickname) {
        this.presentUsers[id] = nickname;
    }

    // remove an existing id-nickname-pair from the list
    remove(id) {
        delete this.presentUsers[id];
    }

    // return the nickname for given id
    nicknameForId(id) {
        return this.presentUsers[id];
    }

    // return a sorted array with all connected nicknames
    getList() {
        return _.values(this.presentUsers).sort();
    }
}

export default new UserList();