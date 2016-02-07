let NETWORK_LATENCY = 100;

let messages = [];

let threadNameMap = (function () {
  let map = {};
  messages.forEach(({threadID, threadName}) => {
    map[threadID] = threadName;
  });
  return map;
})();

export function postMessage(message, callback) {
  let timestamp = Date.now();
  let id = 'm_' + timestamp;
  let threadID = message.threadID;

  let createdMessage = {
    id,
    threadID,
    threadName: threadNameMap[threadID],
    authorName: message.authorName,
    text: message.text,
    timestamp
  };

  messages.push(createdMessage);

  setTimeout(() => {
    callback(createdMessage);
  }, NETWORK_LATENCY);
};
