import express from "express";
import http from "http";
import socketIO from "socket.io";
import morgan from "morgan";
import path from "path";
import _debug from "debug";
import config from "config";
import pug from "pug";

const debug = _debug("websocket-chat");
const isProduction = process.env.NODE_ENV === "production";

debug("NODE_ENV: ", process.env.NODE_ENV);
debug("Configuration is: ", config);

// init and config express app
const app = express();
app.set("views", path.join(__dirname, "..", "templates")); // set root dir of template files
app.set("view engine", "pug"); // set Pug as template engine
app.use(morgan(isProduction ? "combined" : "dev")); // enable request logging
app.use("/static", express.static(path.join(__dirname, "..", "..", "client", "dist"))); // serve client files

// init HTTP server
const httpServer = http.Server(app); // pass express app to bind to server
httpServer.listen(config.get("server.port"));

// init websocket for chat and bind it to HTTP server
const chatSocket = socketIO(httpServer);

// routes
app.get("/", function (req, res) {
    res.render("index", {
        heading: config.get("client.heading"),
        title: config.get("client.title")
    });
});

// socket handling
chatSocket.on("connection", function (socket) {

    // broadcast new user
    socket.broadcast.emit("newMessage", pug.render("strong #[em " + socket.handshake.query.nickname + "] has joined the chat!"));

    // broadcast user on disconnect
    socket.on("disconnect", function(){
        socket.broadcast.emit("newMessage", pug.render("strong #[em " + socket.handshake.query.nickname + "] has left the chat!"));
    });

    // distribute messages
    socket.on("newMessage", function (msg) {
        chatSocket.emit("newMessage", msg);
    });

});