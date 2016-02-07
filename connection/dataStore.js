var Reflux = require('reflux');
var actions = require('./actions');
var autobahn = require('autobahn');

var connection = new autobahn.Connection({
  url: 'ws:'+window.location.host+'/wss',
  realm: 'realm1'
});

var dataStore  = Reflux.createStore({

  listenables: [actions],
  state: {
    session: null
  },

  getState: function() {
    return this.state;
  },

  init: function() {
    var self = this;
    connection.onopen = function (session)
    {
      self.state.session = session;

      function onEvent(publishArgs, kwargs) {
        console.log('Event received args', publishArgs, 'kwargs ',kwargs);

        Actions.createMessage('EVENT!', 't_2');
      }

      // Subscribe to a topic
      session.subscribe('chat.messages', onEvent).then(
        function(subscription) {
           console.log("subscription successfull", subscription);
        },
        function(error) {
           console.log("subscription failed", error);
        }
      );
      self.trigger(self.state);
    };

    connection.onclose = function (session)
    {
      self.state.session = null;
      self.trigger(this.state);
    };

    connection.open();
  },

});

module.exports = dataStore;
