/*eslint-disable no-console, no-var */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('../webpack.config')
var http = require("http");

var chatServer  = require('./demo/chatServer');
var usersServer = require('./demo/usersServer');

WAMPRT_TRACE = true;
var WampRouter = require("wamp.rt");

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

var wamp = new WampRouter({server: server, path: "/wss"});

wamp.on('RealmCreated', function (realm, realmName) {
    console.log('realm created', realmName);
    chatServer(realm.api());
    usersServer(realm.api());
});

server.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
