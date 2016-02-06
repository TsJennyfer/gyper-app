AUTOBAHN_DEBUG = true;
var autobahn = require('autobahn');

var connectUrl = 'ws://127.0.0.1:8080/wss';
console.log('connectUrl:', connectUrl);

var connection = new autobahn.Connection({
    url: connectUrl,
    realm: 'realm1'}
);

var session = null;

connection.onopen = function (session) {

   session.log("Session open.");

   session.call('chat.getMessages', [1,2], {id:'my id'}).then(
      function (data) {
         // this method returns a plain value
         session.log("Call chat.getMessages", data);
connection.close();
      },
      function (error) {
         console.log("Call failed:", error);
connection.close();
      });

};

connection.onclose = function (reason, details) {
   console.log("connection 1", reason, details);
};

connection.open();
