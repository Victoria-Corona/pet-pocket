import React from 'react';

export default class ReminderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
    this.ReminderDetails = this.getReminderDetails.bind(this);
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

  render() {
    if (!this.state.details) {
      return null;
    } else {
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
            <p className="reminderListItem">{this.state.details.date}</p>
          </div>

          <div className="reminderDetails">
            <p className="petTitle">Time:</p>
            <p className="reminderListItem">{this.state.details.time}</p>
          </div>

          <div className="reminderDetails">
            <p className="petTitle">Repeat:</p>
            <p className="reminderListItem">{this.state.details.repeat}</p>
          </div>

          <div className="reminderControls">
            <button type="button" className="reminderButtonDelete" id={this.state.details.reminderId}>DELETE</button>
            <button type="button" className="reminderButtonUpdate" id={this.state.details.reminderId}>UPDATE</button>
          </div>
        </>
      );
    }
  }
}
