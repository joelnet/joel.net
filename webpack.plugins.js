const webpack           = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'

module.exports = function getPlugins() {
    const plugins = [
        new webpack.DefinePlugin({
            'process.env': {
            'NODE_ENV': process.env.NODE_ENV
            }
        }),
        new CopyWebpackPlugin([
            { context: 'content', from: '**/*' }
        ])
    ]

    return isProd
        ? plugins.concat(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                }
            }))
        : plugins
}
