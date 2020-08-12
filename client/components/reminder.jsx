import React from 'react';
import ReminderDetails from './reminder-details';

class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderDetailsView: null,
      currentView: 'reminderDetails'
    };
  }

  componentDidMount() {
    this.getReminder();
  }

  getReminder() {
    fetch(`/api/reminder/${this.props.params.petId}`)
      .then(res => res.json())
      .then(data => this.setState({ reminderDetailsView: data }))
      .catch(err => console.error(err.message));
  }

  render() {
    if (!this.state.reminderDetailsView) {
      return null;
    } else if (this.state.currentView === 'reminderDetails') {
      return <ReminderDetails params={this.state.reminderDetailsView} />;
    }
  }
}
export default Reminder;
