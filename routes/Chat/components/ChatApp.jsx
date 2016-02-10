import React from 'react';
import MessageSection from './MessageSection.jsx';
import ThreadSection from './ThreadSection.jsx';
import * as Actions from '../actions';
import '../css/chatapp.css';

class ChatApp extends React.Component {

  componentDidMount() {
//    Actions.loadRawMessages();
  }

  render() {
    return (
      <div className="chatapp">
        <ThreadSection />
        <MessageSection />
      </div>
    );
  }

};

module.exports = ChatApp;
