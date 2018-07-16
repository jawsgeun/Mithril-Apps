const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: './index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
        rules: [
          {
           test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.ts', '.tsx']
      },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
};