import React from 'react';

export default class ReminderFormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderId: this.props.reminder.reminderId,
      name: this.props.reminder.name,
      type: this.props.reminder.type,
      description: this.props.reminder.description,
      date: this.props.reminder.date,
      time: this.props.reminder.time,
      repeat: this.props.reminder.repeat
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newReminder = {};
    fetch(`/api/pets/${this.props.reminder.reminderId}`, {
      method: 'PUT',
      body: newReminder
    })
      .then(res => res.json())
      .then(reminder => this.setState({ reminderView: true }))
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <div>
        <form action="api/reminder" method="put" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Name:</label>
            <input name="name" type="text" className="form-control" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">Type:</label>
            <input name="type" type="text" className="form-control" placeholder="Enter Type of Reminder" value={this.state.type} onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">Description:</label>
            <input name="description" type="date" className="form-control" placeholder="Enter Description" value={this.state.description} onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">mm/dd/yyyy</label>
            <input name="date" type="text" className="form-control" placeholder="Enter Date" value={this.state.date} onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">00:00:00</label>
            <input name="time" type="text" className="form-control" placeholder="Enter Time" value={this.state.time} onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">Repeat Reminder?</label>
            <input name="repeat" type="text" className="form-control" placeholder="Enter Days to Repeat" value={this.state.repeat} onChange={this.handleChange} />
            <div className="d-flex justify-content-center"><button type="button" className="nextButton mt-3" onClick={this.handleSubmit}>UPDATE</button></div>
          </div>
        </form>
      </div>
    );
  }
}
