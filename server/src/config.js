import commandLineArgs from "command-line-args";

const clargs = [
    {
        name: "assetPath",
        alias: "a",
        type: String,
        defaultValue: "../../client/dist"
    },
    {
        name: "port",
        alias: "p",
        type: Number,
        defaultValue: 3000
    }
];

module.exports = commandLineArgs(clargs);