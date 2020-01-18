const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/main/front/index.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "src/main/resources/templates/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/"
    },
}