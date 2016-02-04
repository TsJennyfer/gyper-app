import React from 'react';
import MessageComposer from './MessageComposer.jsx';
import MessageListItem from './MessageListItem.jsx';
import CurrentMessageStore from '../stores/CurrentMessageStore';
import * as Actions from '../actions';

var autobahn = require('autobahn');

var connection = new autobahn.Connection({
   url: 'ws:'+window.location.host+'/wss',
   realm: 'realm1'}
);

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

class MessageSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    connection.onopen = function (session)
    {
      console.log('autobahn open');

      function onEvent(publishArgs, kwargs) {
        console.log('Event received args', publishArgs, 'kwargs ',kwargs);

        Actions.createMessage('EVENT!', 't_2');
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

    this.unsubscribe = CurrentMessageStore.listen(this._onChange.bind(this));
    this._scrollToBottom();
  }

  componentWillUnmount() {
    connection.onclose = function (session)
    {
      console.log('autobahn close');
    }

    connection.close();

    this.unsubscribe();
  }

  render() {
    if (this.state.messages) {
      let messageListItems = this.state.messages.map(getMessageListItem);
      return (
        <div className="message-section">
          <h3 className="message-thread-heading">{this.state.messages[0].threadName}</h3>
          <ul className="message-list" ref="messageList">
            {messageListItems}
          </ul>
          <MessageComposer threadID={this.state.messages[0].threadID}/>
        </div>
      );
    } else {
      return <div className="message-section"></div>;
    }
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    if (this.refs.messageList) {
      let ul = this.refs.messageList.getDOMNode();
      ul.scrollTop = ul.scrollHeight;
    }
  }

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange(messages) {
    this.setState({ messages });
  }

};

module.exports = MessageSection;
