const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const dev = process.env.NODE_ENV !== "production";
const clearDistPlugin = new CleanWebpackPlugin(path.join(__dirname, "client", "dist"));
const extractCssPlugin = new ExtractTextPlugin("../../client/dist/bundle.css");

module.exports = {
    watch: dev,
    devtool: dev ? "inline-source-map" : false,
    entry: [
        path.join(__dirname, "client/src/js/entry.js"),
        path.join(__dirname, "client/src/index.html"),
        path.join(__dirname, "client/src/css/entry.sass")
    ],
    output: {
        path: path.join(__dirname, "/client/dist/"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: dev ? "file-loader?name=[name].[ext]" : ["file-loader?name=[name].[ext]", "html-minify-loader"]
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: !dev
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [
                                    path.join(__dirname, "node_modules")
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: "file-loader?name=font/[name].[ext]"
            }
        ]
    },
    plugins: dev ? [
        clearDistPlugin,
        extractCssPlugin
    ] : [
        clearDistPlugin,
        extractCssPlugin,
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};