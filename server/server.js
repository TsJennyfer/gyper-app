/*eslint-disable no-console, no-var */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('../webpack.config')
var http = require("http");

WAMPRT_TRACE = true;
var Router = require("wamp.rt");

var app = express()

/*
app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/app/',
  stats: {
    colors: true
  }
}));
*/
var fs = require('fs')
var path = require('path')

//fs.readdirSync(__dirname).forEach(function (file) {
//  if (fs.statSync(path.join(__dirname, file)).isDirectory())
//    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
//})

app.use(express.static(__dirname+'/../www'))

var server = http.createServer(app);

var wamp = new Router({server: server, path: "/wss"});

require('./demo/chatServer')(wamp);
require('./demo/usersServer')(wamp);

server.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
