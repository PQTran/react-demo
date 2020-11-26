import React from 'react';
import Message from './Message';

class ChatLog extends React.Component {
  constructor(props) {
    super(props);

    this.selectedMessage = null;
    this.container = React.createRef();
    this.toggleSelectMessage = this.toggleSelectMessage.bind(this);
  }

  toggleSelectMessage(messageComponent) {
    if (this.selectedMessage === messageComponent) {
      messageComponent.hideDeleteButton();
      this.selectedMessage = null;
    } else {
      this.selectedMessage && this.selectedMessage.hideDeleteButton();
      messageComponent.showDeleteButton();
      this.selectedMessage = messageComponent;
    }
  }

  scrollToBottom() {
    this.container.current.scrollTo(0, this.container.current.scrollHeight);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.props.autoScroll) {
      this.scrollToBottom();
    }
  }

  render() {
    const messageElements = this.props.messages.map((msg) => {
      return <Message
               id={msg.id}
               key={msg.id}
               senderName={msg.user}
               imageUrl={msg.thumbnailUrl}
               timestamp={msg.timestamp}
               content={msg.content}
               onDeleteMessage={this.props.onDeleteMessage}
               onSelectMessage={this.toggleSelectMessage} />
    });

    const containerStyles = {
      overflow: "auto",
      height: "600px",
      backgroundColor: "white",
      scrollBehavior: "smooth"
    };

    return (
      <div ref={this.container} style={containerStyles}>
        {messageElements}
      </div>
    );
  }
}

export default ChatLog;
