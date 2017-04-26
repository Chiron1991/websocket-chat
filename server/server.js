const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const logger = require("morgan");
const path = require("path");

const conf = require("./conf.json");
const isProduction = app.get("env") === "production";

// bind http server to port
http.listen(conf.port);

// conf logging
app.use(logger(isProduction ? "combined" : "dev"));

// serve static files
app.use("/", express.static(path.join(__dirname, "../client")));

// socket handling
io.on("connection", function (socket) {
    socket.on("chat message", function (msg) {
        io.emit("chat message", msg);
    });
});