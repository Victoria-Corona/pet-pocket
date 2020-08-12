import React from 'react';

export default class ReminderListItem extends React.Component {
  render() {
    return (
      <>
        <div className="petTitle">{this.props.name}</div>

        <div className="reminderListItem" onClick={() => this.props.setView('reminderDetails', { petId: this.props.petId })}>
          <span>{this.props.description}</span>
        </div>
      </>
    );
  }
}
