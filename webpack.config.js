const webpack = require('webpack');
const path = require('path');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './app.jsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // SCSS and CSS
        test: /\.(scss|css)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
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
        exclude: path.resolve(__dirname, 'node_modules'),
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
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({ template: 'index.html' })
  ],
  devtool: 'inline-source-map'
}

module.exports = config