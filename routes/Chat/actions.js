import Reflux from 'reflux';
import * as ChatMessageUtils from './utils/ChatMessageUtils';

export let loadRawMessages = Reflux.createAction({
  asyncResult: true
});

export let clickThread = Reflux.createAction();

export let createMessage = Reflux.createAction({
  asyncResult: true,
  children: ['formattedMessage']
});

createMessage.listen(function (text, currentThreadID) {
  let message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
  this.formattedMessage(message);
  connection.postMessage(message, rawMessage => {
    this.completed({ rawMessage, tempMessageID: message.id });
  });
});
