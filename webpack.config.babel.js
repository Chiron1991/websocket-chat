import ExtractTextPlugin from "extract-text-webpack-plugin";
import path from "path";
import webpack from "webpack";

const dev = process.env.NODE_ENV !== "production";
const extractCssPlugin = new ExtractTextPlugin(path.join("..", "..", "client", "dist", "bundle.css"));

module.exports = {
    devtool: dev ? "inline-source-map" : false,
    entry: [
        path.join(__dirname, "client", "src", "js", "entry.js"),
        path.join(__dirname, "client", "src", "css", "entry.sass"),
        path.join(__dirname, "client", "src", "img", "fa-comments.ico")
    ],
    output: {
        path: path.join(__dirname, "client", "dist"),
        filename: "bundle.js"
    },
    resolve: {
        modules: [
            path.join(__dirname, "client", "src", "js"),
            path.join(__dirname, "node_modules")
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "es2015"
                    ]
                }
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
            },
            {
                test: /\.(ico)$/,
                loader: "file-loader?name=[name].[ext]"
            }
        ]
    },
    plugins: dev ? [
        extractCssPlugin
    ] : [
        extractCssPlugin,
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};