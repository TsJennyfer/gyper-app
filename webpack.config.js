/*
to package
    "eslint": "^1.7.3",
    "eslint-config-rackt": "^1.1.0",
    "eslint-plugin-react": "^3.6.3",

*/

require('es6-promise').polyfill(); // old node 0.10

var path = require('path');
var webpack = require('webpack');

module.exports = {
  externals: {
    jquery: "jQuery",
    autobahn: "autobahn"
  },
  plugins: [
//    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName= */'vendor',
      /* filename= */'vendor.js'
    ),
/*    new webpack.ProvidePlugin({ // If you use "_", underscore is automatically required
      "$": "jquery",
      "_": "underscore",
    }) */
  ],
  resolve: {
    alias: {
      "lodash":       path.resolve("./node_modules/lodash"),
      "react":        path.resolve("./node_modules/react/react.js"),
      "react-dom":    path.resolve("./node_modules/react/lib/ReactDOM.js"),
      "react-router": path.resolve("./node_modules/react-router"),
      "reflux":       path.resolve("./node_modules/reflux/src/index.js"),
      "object-assign":path.resolve("./node_modules/object-assign/index.js"),
    }
  },
  entry: {
    demoshop: [
      './demoshop/app.js'
    ],
//    employee: [
//      'employee/views/contact.js'
//    ],
//    loader: [
//      'core/app.js'
//    ]
    navbar: [
      './navbar/app.js'
    ],
    vendor: [
      'lodash',
      'react',
      'react-dom',
      'reflux',
      'object-assign'
    ]
  },
  output: {
    path: 'www/app',
    filename: '[name].js',
    publicPath: 'app/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  devtool: 'source-map',
//  devtool: 'inline-source-map',
  scripts: {
    watch: "webpack --watch -d --display-error-details"
  }
};
