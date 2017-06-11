import _ from "lodash";

export default {
    presentUsers: {},

    // add a new clientId-nickname-pair to the list
    add: function (id, nickname) {
        this.presentUsers[id] = nickname;
    },

    // remove an existing clientId-nickname-pair from the list
    remove: function (id) {
        delete this.presentUsers[id];
    },

    // return the nickname for given id
    nicknameForId: function (id) {
        return this.presentUsers[id];
    },

    // return a sorted array with all connected nicknames
    getList: function () {
        return _.values(this.presentUsers);
    }
};