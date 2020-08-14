import React from 'react';

export default class ReminderListItem extends React.Component {
  render() {
    return (
      <>
        <div className="font-weight-bold ml-3">{this.props.name}</div>
        <div className="reminderListItem" onClick={() => this.props.setView('reminderDetails', { reminderId: this.props.reminderId })}>
          <span>{this.props.description}</span>
        </div>
      </>
    );
  }
}
