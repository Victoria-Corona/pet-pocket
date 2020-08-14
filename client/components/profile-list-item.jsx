import React from 'react';

export default class ProfileListItem extends React.Component {

  render() {
    return (
      <div className="profileListItem mt-2" onClick={() => this.props.setView('details', { petId: this.props.petId })}>
        <img src={this.props.img} className="profilePicture mr-2 p-2" /><span>{this.props.name}</span>
      </div>
    );
  }
}
