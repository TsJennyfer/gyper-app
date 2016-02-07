'use strict';

var shop = require('../common/api/shop');
var ActionCreators = require('../actions/ActionCreators');
var autobahn = require('autobahn');


var connection = new autobahn.Connection({
   url: 'ws://localhost:9000',
   realm: 'realm1'}
);

connection.onopen = function (session) {
      console.log('autobahn open');

   function onEvent(publishArgs, kwargs) {
      console.log('Event received args', publishArgs, 'kwargs ',kwargs);
   }

   // Subscribe to a topic
   session.subscribe('com.myapp.topic1', onEvent).then(
      function(subscription) {
         console.log("subscription successfull", subscription);
      },
      function(error) {
         console.log("subscription failed", error);
      }
   );
}

connection.open();

var WebAPIUtils = {
    getAllProducts: function () {
        shop.getProducts(function (products) {
console.log('getProducts', products);
            ActionCreators.receiveProducts(products);
        });
    },

    checkoutProducts: function (products) {
console.log('checkoutProducts', products);
        shop.buyProducts(products, function () {
            ActionCreators.finishCheckout(products);
        });
    }
};

ActionCreators.cartCheckout.listen(function (products) {
    WebAPIUtils.checkoutProducts(products);
});

module.exports = WebAPIUtils;
