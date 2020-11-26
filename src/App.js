import React from 'react';
import ChatLog from './ChatLog';
import Prompt from './Prompt';
import utility from './utility.js';
import data from './message-data.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.autoScroll = true;
    this.state = {messages: data.messages};
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleDeleteMessage(id) {
    this.autoScroll = false;
    this.setState((state, props) => {
      const messages = state.messages.filter(msg => msg.id !== id);
      return {messages};
    });
  }

  handleSendMessage(text) {
    const currentUser = utility.getCurrentUser();

    this.autoScroll = true;
    this.setState((state, props) => {
      const message = {
        id: utility.generateUUID(),
        user: utility.getCurrentUser().id,
        timestamp: (new Date()).getTime().toString(),
        content: text
      };

      if (currentUser.thumbnailUrl) {
        message.thumbnailUrl = currentUser.thumbnailUrl;
      }

      return {messages: state.messages.concat(message)};
    });
  }

  render() {
    return (
      <div className="app">
        <div className="app-window">
          <div className="window-decorator">
            <div className="decorator-button red-button"></div>
            <div className="decorator-button yellow-button"></div>
            <div className="decorator-button green-button"></div>
          </div>
          <ChatLog messages={this.state.messages} autoScroll={this.autoScroll} onDeleteMessage={this.handleDeleteMessage} />
          <Prompt onSendMessage={this.handleSendMessage} />
        </div>
      </div>
    );
  }
}

export default App;
