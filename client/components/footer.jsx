import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <div className="mt-auto p-4 header-background d-flex justify-content-between align-items-center">
        <i className="fas fa-paw fa-2x"></i>
        <i className="fas fa-plus-circle fa-2x"></i>
        <i className="fas fa-clipboard-list fa-2x"></i>
        <i className="fas fa-exclamation-circle fa-2x"></i>
      </div>
    );
  }
}
