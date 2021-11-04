'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  //entry: './src/js/script.js', - у него так
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
    // path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
