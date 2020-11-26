import React from 'react';
import './ProfileThumbnail.css'

class ProfileThumbnail extends React.Component {
  constructor(props) {
    super(props);

    let thumbnail;
    if (props.imageUrl) {
      thumbnail = this.getImageElement(props.imageUrl);
    } else {
      thumbnail = this.getPlaceholderElement(props.username);
    }

    this.state = {thumbnail};
  }

  getPlaceholderElement(username) {
    return (
      <div className="placeholder-thumbnail">
        {username.charAt(0)}
      </div>
    );
  }

  getImageElement(srcUrl) {
    return <img className="image-thumbnail" alt="Profile thumbnail" src={srcUrl} />;
  }

  render() {
    return this.state.thumbnail;
  }
}

export default ProfileThumbnail;
