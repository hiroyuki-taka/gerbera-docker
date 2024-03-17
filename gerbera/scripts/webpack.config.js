const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const config = {
    mode: 'production',
    entry: {
        'import': './src/import.ts'
    },
    output: {
        publicPath: 'build',
        filename: '[name].js',
        chunkFormat: "module",
        clean: true
    },
    module: {
        rules: [
            {test: /\.ts$/, use: [{loader: 'ts-loader'}]}
        ]
    },
    resolve: {
        extensions: ['.ts', 'js']
    },
    target: ['es2015']
}

module.exports = config
