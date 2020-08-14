import React from 'react';

export default class ReminderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
    this.getReminderDetails = this.getReminderDetails.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getReminderDetails();
  }

  getReminderDetails() {
    fetch(`/api/reminder/${this.props.params.reminderId}`)
      .then(res => res.json())
      .then(data => this.setState({ details: data }))
      .catch(err => console.error(err.message));
  }

  handleDelete() {
    fetch(`/api/reminder/${this.props.params.reminderId}`, {
      method: 'DELETE'
    })
      .then(this.props.setView('reminderList', {}))
      .catch(error => console.error(error.message));
  }

  render() {

    if (!this.state.details) {
      return null;
    } else {

      const reminderDate = this.state.details.date;
      const date = new Date(reminderDate);
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      };
      const reminderDateNew = (new Intl.DateTimeFormat('en-US', options).format(date));

      const time = this.state.details.date;
      const newTime = new Date(time);
      const timeOpt = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      const timeFormat = newTime.toLocaleString('en-US', timeOpt);

      return (
        <>
          <div className="font-weight-bold pl-3 mt-3"> Reminder For {this.state.details.name}</div>

          <div className="reminderDetails">
            <p className="petTitle">Type:</p>
            <p className="reminderListItem">{this.state.details.type}</p>
          </div>

          <div className="reminderDetails">
            <p className="petTitle">Description:</p>
            <p className="reminderListItem">{this.state.details.description}</p>
          </div>

          <div className="reminderDetails">
            <p className="petTitle">Date:</p>
            <p className="reminderListItem">{reminderDateNew}</p>
          </div>

          <div className="reminderDetails">
            <p className="petTitle">Time:</p>
            <p className="reminderListItem">{timeFormat}</p>
          </div>

          <div className="reminderDetails">
            <p className="petTitle">Repeat:</p>
            <p className="reminderListItem">{this.state.details.repeat}</p>
          </div>

          <div className="reminderControls">
            <button type="button" className="reminderButtonDelete" id={this.state.details.reminderId} onClick={() => this.handleDelete()}>DELETE</button>
          </div>
        </>
      );
    }
  }
}
