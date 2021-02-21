const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const config = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'import': './src/import.ts'
    },
    output: {
        publicPath: 'build',
        filename: '[name].js',
        chunkFilename: 'module-[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {test: /\.ts$/, use: [{loader: 'ts-loader'}]}
        ]
    },
    resolve: {
        extensions: ['.ts', 'js']
    },
    target: ['es5']
}

module.exports = config
