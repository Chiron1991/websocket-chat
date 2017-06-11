import client from "socket.io-client";
import {promptNickname} from "promptNickname";

// prepare DOM stuff
const userList = document.getElementById("user-list");
const historyWrapper = document.getElementById("history-wrapper");
const history = document.getElementById("history");
const message = document.getElementById("message");
function appendToHistory(msg) {
    history.insertAdjacentHTML("beforeend", "<li>" + msg + "</li>");
    historyWrapper.scrollTop = historyWrapper.scrollHeight;
}

// connect to server
const socket = client({
    query: "nickname=" + promptNickname()
});

// bind sending event to form
document.getElementById("message-form").onsubmit = function () {
    socket.emit("newMessage", message.value);
    message.value = "";
    message.focus();
    return false;
};

// append incoming new messages to history
socket.on("newMessage", function (msg) {
    appendToHistory(msg);
});

// put updated user list to place
socket.on("updateUserList", function(newUserList){
    userList.innerHTML = newUserList;
});