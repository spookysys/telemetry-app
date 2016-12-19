const path = require("path")
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');


module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.(png|gif|jpg|jpeg)$/,
            loader: 'file-loader'
        }, {
            test: /Cesium\.js$/,
            loader: 'script'
        }]
    },
    plugins: [
        new HtmlPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};