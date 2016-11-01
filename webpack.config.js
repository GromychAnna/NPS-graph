const scaleLinear = require('d3-scale');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: [
      './index.js',
      './main.js'
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: './bundle.js'
  },

  watch: true,
  watchPoll: true,
  watchOptions: {
    ignored: /(node_modules|vendor_libs)/,
    aggregateTimeout: 300,
    poll: 500
  },
  devServer: {
    watchPoll: true,
    watchOptions: {
      ignored: /(node_modules|vendor_libs)/,
      aggregateTimeout: 300,
      poll: 500
    }
  },
  resolve: {
    modulesDirectories: [ 'node_modules'],
    extensions: [ '', '.js', '.jade', '.css', '.sass', '.scss', '.json' ],
    alias: {
      jquery: '../node_modules/jquery/dist/jquery.min.js'
      //jquery: './jquery/dist/jquery.min.js'   //-  Cannot resolve 'file' or 'directory' ./jquery/dist/jquery.min.js
    }
  },

  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json'}
    ],
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
        loader: 'jade-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader!sass-loader')
      },
      {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].styles.css'),
    new webpack.ProvidePlugin({
      $: "../node_modules/jquery/dist/jquery.min.js",
      jQuery: "../node_modules/jquery/dist/jquery.min.js"
      //"window.jQuery": "./node_modules/jquery/dist/jquery.min.js"
      //$: "jquery",
      //jQuery: "jquery",
      //"window.jQuery": "jquery"
    })
  ],
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
