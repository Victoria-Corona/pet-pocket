import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="p-4 header-background d-flex justify-content-between align-items-center">
        <i className="fas fa-edit fa-lg hidden"></i>
        <span className="title">PET POCKET</span>
        <i className="fas fa-undo-alt fa-lg"></i>
      </div>
    );
  }
}
