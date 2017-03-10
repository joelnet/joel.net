const webpack           = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path              = require('path')
const getPlugins        = require('./webpack.plugins')

module.exports = {
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            }
        ]
    },
    plugins: getPlugins()
}
