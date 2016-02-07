'use strict';

var React = require('react');
var App = require('./components/App.jsx');
var WebAPIUtils = require('./utils/WebAPIUtils');

var render = require('react-dom').render;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

WebAPIUtils.getAllProducts();

/*
React.render(
    React.createElement(App, null),
    document.getElementById('reflux-app')
);
*/
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('reflux-app'));
