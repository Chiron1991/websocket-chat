import client from "socket.io-client";
import {EmojiConvertor} from "emoji-js";
import {promptNickname} from "promptNickname";

// prepare DOM stuff
const userList = document.getElementById("user-list");
const historyWrapper = document.getElementById("history-wrapper");
const history = document.getElementById("history");
const message = document.getElementById("message");
function appendToHistory(message) {
    history.insertAdjacentHTML("beforeend", "<li>" + message + "</li>");
    historyWrapper.scrollTop = historyWrapper.scrollHeight;
}

// init emoji converter
const emoji = new EmojiConvertor();
emoji.img_sets.apple.path = "/static/emoji-apple/";
emoji.include_title = true;

// connect to server
const socket = client({
    query: "nickname=" + promptNickname()
});

// bind sending event to form
document.getElementById("message-form").onsubmit = function () {
    socket.emit("newChatMessage", message.value);
    message.value = "";
    message.focus();
    return false;
};

// replace colon notation on incoming chat messages, then append to history
socket.on("newChatMessage", function (message) {
    appendToHistory(emoji.replace_colons(message));
});

// append system messagen to history
socket.on("newSystemMessage", function (message) {
    appendToHistory(message);
});

// put updated user list to place
socket.on("updateUserList", function (newUserList) {
    userList.innerHTML = newUserList;
});