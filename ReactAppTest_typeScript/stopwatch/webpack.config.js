const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
  const is_production = env === 'production';
  const output_dir = path.resolve(__dirname, '../docs/stopwatch');

  const plugins = [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin({
      filename: is_production ? '[name].[chunkhash].css' : '[name].css'
    })
  ]

  if (is_production) {
    plugins.push(new CleanWebpackPlugin([output_dir], {
      root: path.resolve(output_dir, '..')
    }));
  }

  return {
    mode: is_production ? 'production' : 'development',
    entry: {
      index: './src/index'
    },
    output: {
      path: path.resolve(__dirname, output_dir),
      filename: is_production ? '[name].[chunkhash].js' : '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            loader: 'css-loader',
            options: {
              minimize: is_production,
              localIdentName: is_production ? '[hash:base64]' : '[path][name]__[local]--[hash:base64:5]'
            }
          })
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          }
        }
      }
    },
    plugins: plugins
  };
};
