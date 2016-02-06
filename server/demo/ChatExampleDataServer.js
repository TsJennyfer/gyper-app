'use strict';

var messages = [
  {
    id: 'm_1',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: Date.now() - 99999
  },
  {
    id: 'm_2',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Seems like a pretty cool conference.',
    timestamp: Date.now() - 89999
  },
  {
    id: 'm_3',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Jing',
    text: 'Sounds good.  Will they be serving dessert?',
    timestamp: Date.now() - 79999
  },
  {
    id: 'm_4',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Bill',
    text: 'Hey Dave, want to get a beer after the conference?',
    timestamp: Date.now() - 69999
  },
  {
    id: 'm_5',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Dave',
    text: 'Totally!  Meet you at the hotel bar.',
    timestamp: Date.now() - 59999
  },
  {
    id: 'm_6',
    threadID: 't_3',
    threadName: 'Functional Heads',
    authorName: 'Bill',
    text: 'Hey Brian, are you going to be talking about functional stuff?',
    timestamp: Date.now() - 49999
  },
  {
    id: 'm_7',
    threadID: 't_3',
    threadName: 'Bill and Brian',
    authorName: 'Brian',
    text: 'At ForwardJS?  Yeah, of course.  See you there!',
    timestamp: Date.now() - 39999
  }
];

var threadNameMap = (function () {
  var map = {};
  messages.forEach(function(threadID, threadName){
    map[threadID] = threadName;
  });
  return map;
})();

function postMessage(message, callback) {
  var timestamp = Date.now();
  var id = 'm_' + timestamp;
  var threadID = message.threadID;

  var createdMessage = {
    id: id,
    threadID: threadID,
    threadName: threadNameMap[threadID],
    authorName: message.authorName,
    text: message.text,
    timestamp: timestamp
  };

  messages.push(createdMessage);

  setTimeout(function(){
    callback(createdMessage);
  }, NETWORK_LATENCY);
};

function registerWamp(app)
{
  app.regrpc('chat.getMessages', function(id,args) {
    console.log('called chat.getMessages', args);
    app.resrpc(id, /* no error */ null, [messages, {id:'test'}]);
  });
}

module.exports = registerWamp;
