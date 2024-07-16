const path = require('path');

module.exports = {
    entry: {
        "main": "./src/ts/main.ts",
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: "main.min.js",
        publicPath: "dist/js",
        library: {
            name: 'Slideshow',
            type: 'umd',
            export: 'default'
        }
    },
    module: {
        rules: [
            { 
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    mode: "production",
    // devtool: "source-map",
};