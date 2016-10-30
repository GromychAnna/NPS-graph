//import autoprefixer from 'autoprefixer';
//export default function config() {
//  return {
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
module.exports = {
  context: __dirname + '/app',
  entry: [
      './index.js',
      //'babel-polyfill',
      //'./app/directives/contacts-table/contacts-table.scss'
  ],
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/app',
    filename: './bundle.js'
  },

  watch: true,
  watchOptions: {
    aggregateTimeout: 300
  },

  resolve: {
    modulesDirectories: [ 'node_modules'],
    extensions: [ '', '.js', '.jade', '.css', '.sass', '.scss', '.json' ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },

  'postcss': [
    autoprefixer({
      browsers: [
        'last 2 versions',
        'Explorer >= 11'
      ],
      cascade: false
    })
  ]
};
