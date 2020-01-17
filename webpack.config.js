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
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
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