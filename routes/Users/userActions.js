'use strict';

var Reflux = require('reflux');

var userActions = Reflux.createActions([
  'fetchList',
  'unloadList'
]);

module.exports = userActions;
