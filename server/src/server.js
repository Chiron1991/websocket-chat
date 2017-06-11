import express from "express";
import http from "http";
import io from "socket.io";
import morgan from "morgan";
import path from "path";
import _debug from "debug";
import nunjucks from "nunjucks";
import config from "./configReader";
import userList from "./userList";
import {ChatMessageRenderer, SystemMessageRenderer, UserListRenderer} from "./snippetRenderer";

const debug = _debug("websocket-chat");
const isProduction = process.env.NODE_ENV === "production";

debug("NODE_ENV: ", process.env.NODE_ENV);
debug("Configuration is: ", config);

// init and config express app
const app = express();
app.use(morgan(isProduction ? "combined" : "dev")); // enable request logging
app.use("/static", express.static(path.resolve(__dirname, "../../client/dist"))); // serve client files

// init HTTP server
const httpServer = http.Server(app); // pass express app to bind to server
httpServer.listen(config.get("server.port"));

// init websocket for chat and bind it to HTTP server
const chatSocket = io(httpServer);

// init template engine
nunjucks.configure(path.resolve(__dirname, "../templates"), {
    autoescape: true,
    express: app
});

// routes
app.get("/", function (req, res) {
    res.render("index.nunjucks", {
        heading: config.get("client.heading"),
        title: config.get("client.title")
    });
});

// socket handling
chatSocket.on("connection", function (socket) {

    // add new user to user list
    userList.add(socket.id, socket.handshake.query.nickname);

    // broadcast new user
    socket.broadcast.emit("newMessage", SystemMessageRenderer.render({
        message: userList.nicknameForId(socket.id) + " has joined the chat!"
    }));
    chatSocket.emit("updateUserList", UserListRenderer.render());

    // broadcast left user
    socket.on("disconnect", function () {
        socket.broadcast.emit("newMessage", SystemMessageRenderer.render({
            message: userList.nicknameForId(socket.id) + " has left the chat!"
        }));
        userList.remove(socket.id);
        chatSocket.emit("updateUserList", UserListRenderer.render());
    });

    // distribute messages
    socket.on("newMessage", function (message) {
        chatSocket.emit("newMessage", ChatMessageRenderer.render({
            message: message,
            user: userList.nicknameForId(socket.id)
        }));
    });

});