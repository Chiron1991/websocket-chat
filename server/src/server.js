import express from "express";
import http from "http";
import socketIO from "socket.io";
import morgan from "morgan";
import path from "path";
import _debug from "debug";
import config from "./config";

const debug = _debug("websocket-chat");
const isProduction = process.env.NODE_ENV === "production";

debug("NODE_ENV: ", process.env.NODE_ENV);
debug("Configuration is: ", config);

// init and conf express app
const app = express();
app.use(morgan(isProduction ? "combined" : "dev")); // request logging
app.use("/", express.static(path.join(__dirname, config.assetPath))); // serve client files

// init HTTP server
const httpServer = http.Server(app); // pass express app to bind to server
httpServer.listen(config.port);

// init websocket for chat and bind it to HTTP server
const chatSocket = socketIO(httpServer);

// socket handling
chatSocket.on("connection", function (socket) {
    socket.on("newMessage", function (msg) {
        chatSocket.emit("newMessage", msg);
    });
});