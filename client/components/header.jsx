import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="p-4 header-background d-flex justify-content-between align-items-center">
        <i className="fas fa-edit fa-2x hidden"></i>
        <span className="title">PET POCKET</span>
        <i className="fas fa-undo-alt fa-2x"></i>
      </div>
    );
  }
}
