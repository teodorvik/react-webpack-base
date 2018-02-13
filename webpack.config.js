const webpack = require('webpack')
const path = require('path')
const page1Config = require('./page1.config')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: page1Config.entry
  ,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
      test: /\.(scss|css)$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
}
// module: {
//   rules: [{
//     test: /\.js$/,
//     include: path.resolve(__dirname, 'src'),
//     use: [{
//       loader: 'babel-loader',
//       options: {
//         presets: [
//           ['es2015', { modules: false }]
//         ]
//       }
//     }]
//   }]
// }

module.exports = config