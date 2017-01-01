const path = require('path')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

const config = {
    entry: {
        'react-with-tap-event': ['./src/index.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProd ? '[name].min.js' : '[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
    ],
}

if (isProd) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false,
        })
    )
}

module.exports = config
