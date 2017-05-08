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
app.set("views", path.join(__dirname, "..", "templates")); // set root dir of template files
app.set("view engine", "pug"); // set Pug as template engine
app.use(morgan(isProduction ? "combined" : "dev")); // enable request logging
app.use("/static", express.static(path.join(__dirname, config.assetPath))); // serve client files

// init HTTP server
const httpServer = http.Server(app); // pass express app to bind to server
httpServer.listen(config.port);

// init websocket for chat and bind it to HTTP server
const chatSocket = socketIO(httpServer);

// routes
app.get("/", function (req, res) {
    res.render("index");
});

// socket handling
chatSocket.on("connection", function (socket) {
    socket.on("newMessage", function (msg) {
        chatSocket.emit("newMessage", msg);
    });
});