import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="p-4 header-background d-flex justify-content-between align-items-center header">
        <i className="fas fa-sign-out-alt fa-2x hidden"></i>
        <span className="title">PET POCKET</span>
        <i className="fas fa-sign-out-alt fa-2x" onClick={() => this.props.setView('homepage', { petId: this.props.petId })}></i>
      </div>
    );
  }
}
