'use strict';

var Reflux = require('reflux');
var userActions = require('./userActions');
var gyper = require('../../connection/dataStore');

var UserStore = Reflux.createStore({
  listenables: userActions,

  init: function () {
    this.session = gyper.session;
    this.users = [];
    this.listenTo(gyper, this.connectionChanged);
    this.listenTo(userActions.unloadList, this.onUnloadUserList);
    this.listenTo(userActions.fetchList, this.onFetchUserList);
  },

  getInitialState: function () {
    return {users:this.users};
  },

  connectionChanged: function (session) {
    console.log('connection changed');
    this.session = session;
  },

  onFetchUserList: function () {
    var self = this;
    this.session.call('user.getUsers').then(function (data) {
      self.users = data.args;
      self.trigger(self.users);
    });
  },

  onUnloadUserList: function () {
    this.users = [];
    console.log('onUnloadList');
  }

});

module.exports = UserStore;
