import React from 'react';
import MessageComposer from './MessageComposer.jsx';
import MessageListItem from './MessageListItem.jsx';
import CurrentMessageStore from '../stores/CurrentMessageStore';
import * as Actions from '../actions';

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
    this.unsubscribe = CurrentMessageStore.listen(this._onChange.bind(this));
    this._scrollToBottom();
  }

  componentWillUnmount() {
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
