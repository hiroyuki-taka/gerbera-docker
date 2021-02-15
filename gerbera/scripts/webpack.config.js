const path = require("path")

module.exports = env => {
    return [
        {
            name: 'default',
            mode: 'development',
            devtool: false,
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
            }
        }
    ]
}