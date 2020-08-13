import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <div className="p-4 header-background d-flex justify-content-between align-items-center footer">
        <i className="fas fa-home fa-lg" onClick={() => this.props.setView('mainMenu', { petId: this.props.petId })}></i>
        <i className="fas fa-paw fa-lg" onClick={() => this.props.setView('profileList', { petId: this.props.petId })}></i>
        <i className="fas fa-plus-circle fa-lg" onClick={() => this.props.setView('profileForm', { petId: this.props.petId })}></i>
        <i className="fas fa-clipboard-list fa-lg" onClick={() => this.props.setView('todoList', { petId: this.props.petId })}></i>
        <i className="fas fa-exclamation-circle fa-lg" onClick={() => this.props.setView('reminderList', { petId: this.props.petId })}></i>
      </div>
    );
  }
}
