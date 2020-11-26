import React from 'react';
import './Prompt.css';

class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ""};

    this.textarea = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.textarea.current.focus();
  }

  updateTextareaHeight() {
    this.textarea.current.style.height = `${this.textarea.current.scrollHeight}px`;
  }

  handleChange(event) {
    this.updateTextareaHeight();

    this.setState({message: event.target.value})
  }

  sendMessage() {
    if (this.state.message.trim() !== '') {
      this.props.onSendMessage(this.state.message);
      this.setState({message: ""});
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="prompt-container">
        <textarea placeholder="Send a message."
                  ref={this.textarea}
                  value={this.state.message}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}></textarea>
        <button className="send-button" onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export default Prompt;
