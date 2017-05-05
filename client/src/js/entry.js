import client from "socket.io-client";

const socket = client();
const historyWrapper = document.getElementById("history-wrapper");
const history = document.getElementById("history");
const message = document.getElementById("message");

document.getElementById("message-form").onsubmit = function () {
    socket.emit("newMessage", message.value);
    message.value = "";
    message.focus();
    return false;
};

socket.on("newMessage", function (msg) {
    history.insertAdjacentHTML("beforeend", "<li>" + msg + "</li>");
    historyWrapper.scrollTop = historyWrapper.scrollHeight;
});