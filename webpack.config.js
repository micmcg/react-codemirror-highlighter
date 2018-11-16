const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/src/index.html'),
    filename: './index.html',
});

const codemirrorReplacementWebpackPlugin = new webpack.NormalModuleReplacementPlugin(
    /(\.\.\/)+lib\/codemirror/,
    path.join(__dirname, 'src/codemirror-shim.js')
);

module.exports = {
    entry: path.join(__dirname, 'examples/src/index.jsx'),
    output: {
        path: path.join(__dirname, 'examples/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [htmlWebpackPlugin, codemirrorReplacementWebpackPlugin],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 3001,
    },
};
