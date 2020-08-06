import React from 'react';

export default class ProfileListItem extends React.Component {
  render() {
    return (
      <div className="profileListItem m-2" >
        <img src={this.props.img} className="profilePicture mr-2 p-2" /><span>{this.props.name}</span>
      </div>

    );
  }
}
