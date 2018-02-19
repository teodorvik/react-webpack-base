const webpack = require('webpack');
const yargs = require('yargs');
const { resolve } = require('path');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * TODO:
 * Add CommonsChunkPlugin
 * Service Workers
 * DedupePlugin
 * Codesplitting
 * TreeShaking
 */

const config = (env) => ({
  context: resolve(__dirname, 'src'),
  entry: './app.jsx',
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/build/',
    pathinfo: !env.prod
  },
  module: {
    rules: [
      {
        // SCSS and CSS
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        // Different image formats
        // Outputs to public/assets/images/ folder
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        loader: "file-loader",
        query: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      },
      {
        // To support @font-face rule
        // Outputs to public/assets/fonts/ folder 
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        query: {
          limit: '10000',
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        // JSX and JS
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // HTML
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' })
  ],
  devtool: env.prod ? 'source-map' : 'eval',
  devServer: {
    contentBase: "./build"
  }
});

module.exports = config;
// new CleanWebpackPlugin(['build']),