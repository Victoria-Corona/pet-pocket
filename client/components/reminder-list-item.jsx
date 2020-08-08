import React from 'react';

export default class ReminderListItem extends React.Component {
  render() {
    return (
      <div className="reminderListItem" onClick={() => this.props.setView('details', { petId: this.props.petId })}>
        <span>{this.props.description}</span>
      </div>
    );
  }
}
