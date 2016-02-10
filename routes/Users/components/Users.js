var React = require('react');
var Reflux = require('reflux');
var UserStore = require('../userStore');
var userActions = require('../userActions');

var Users = React.createClass({

  mixins: [Reflux.connect(UserStore)],

  componentDidMount: function() {
    userActions.fetchList();
  },

  componentWillUnmount: function() {
    userActions.unloadList();
  },

  render: function () {
    console.log('USER RENDER', this.state);

    var users = this.state.users.map(function (item) {
      console.log('USER ITEM', item);
    });

    return (
      <div>
        <h2>Users</h2>
        {users}
      </div>
    )
  }

});

module.exports = Users
