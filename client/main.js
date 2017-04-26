$(function () {
    const socket = io();
    const $messages = $("#messages");
    const $messageInput = $("#m");

    $("form").submit(function () {
        socket.emit("chat message", $messageInput.val());
        $messageInput.val("");
        return false;
    });

    socket.on("chat message", function (msg) {
        $messages.append("<li>" + msg + "</li>");
    });
});