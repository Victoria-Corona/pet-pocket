import React from 'react';
import ReminderListItem from './reminder-list-item';

export default class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reminder: [] };
    this.getReminder = this.getReminder.bind(this);
  }

  getReminder() {
    fetch('/api/reminder')
      .then(res => res.json())
      .then(reminder =>
        this.setState({
          reminder: reminder
        }))
      .catch(err => console.error(err.message));
  }

  componentDidMount() {
    this.getReminder();
  }

  render() {
    const reminderList = this.state.reminder.map(reminder =>
      <ReminderListItem
        key={reminder.petId}
        petId={reminder.petId}
        name={reminder.name}
        type={reminder.type}
        description={reminder.description}
        date={reminder.date}
        time={reminder.time}
        repeat={reminder.repeat}
        setView={this.props.setView} />);
    return (
      <>
        <div className="p-2 mt-4">
          <div className="d-flex justify-content-center">
            <h5 style={{ fontWeight: 'bold' }}><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>ADD REMINDER</h5>
          </div>
          <div className="mt-4">
            <h6 style={{ fontWeight: 'bold' }}>REMINDERS</h6>
            <div className="d-flex justify-content-center flex-wrap">{reminderList}</div>
          </div>
        </div>
      </>
    );
  }
}