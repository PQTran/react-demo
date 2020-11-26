import React from 'react';
import ProfileThumbnail from './ProfileThumbnail';
import utility from './utility.js';
import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {displayDeleteButton: false};
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  showDeleteButton() {
    this.setState({displayDeleteButton: true});
  }

  hideDeleteButton() {
    this.setState({displayDeleteButton: false});
  }

  deleteMessage() {
    this.props.onDeleteMessage(this.props.id);
  }

  getThumbnail() {
    return <ProfileThumbnail imageUrl={this.props.imageUrl} username={this.props.senderName} />;
  }

  formatDate(date) {
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = date.getFullYear().toString().substring(2, 4);

    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const calendarStr = `${date.getDate()}/${formattedMonth}/${formattedYear}`;
    const timeStr = `${date.getHours()}:${formattedMinutes}`;

    return `${calendarStr} ${timeStr}`;
  }

  getMessageBubble() {
    const currentUser = utility.getCurrentUser();
    const msgTailClass = currentUser.id === this.props.senderName ? "right-tail" : "left-tail";
    const msgDate = new Date(parseInt(this.props.timestamp));
    const formattedDate = this.formatDate(msgDate);

    return (
      <div className={`message-bubble message-bubble-tail ${msgTailClass}`}>
        <div className="message-text">
          <div className="message-header">{this.props.senderName}</div>
          <p>{this.props.content}</p>
          <div className="message-timestamp">{formattedDate}</div>
        </div>
      </div>
    );
  }

  render() {
    const currentUser = utility.getCurrentUser();
    const thumbnail = this.getThumbnail();
    const messageBubble = this.getMessageBubble();
    const visibilityClass = this.state.displayDeleteButton ? 'button-visible' : 'button-invisible';

    return (
      <div className="message-row">
        {currentUser.id !== this.props.senderName && thumbnail}
        <div className="message-container" onClick={() => this.props.onSelectMessage(this)}>
          {messageBubble}
          <div className={`delete-button ${visibilityClass}`} onClick={this.deleteMessage}>
            <small>Delete</small>
          </div>
        </div>
        {currentUser.id === this.props.senderName && thumbnail}
      </div>
    );
  }
}

export default Message;
