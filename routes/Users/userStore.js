'use strict';

var Reflux = require('reflux');
var UserActions = require('./userActions');
var gyper = require('../../connection/dataStore');

var UserStore = Reflux.createStore({
  listenables: UserActions,

  init: function () {
    this.session = null;
    this.listenTo(gyper, this.connectionChanged);
  },

  getInitialState: function () {
    console.log('initial state');
    return {
      users: []
    };
  },

  connectionChanged: function (state) {
    console.log('connection changed');
    this.session = state.session;
    if (state.session)
      this.fetchUserList();
  },

  fetchUserList: function () {
    var self = this;
    this.session.call('user.getUsers').then(function (data) {
      console.log('users loaded', data.args);
      self.setState({users:data.args});
    });
  }

});

module.exports = UserStore;
