import React from 'react';

export default class ReminderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      description: '',
      date: '',
      time: '',
      repeat: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const nameTarget = event.target.name;
    const valueTarget = event.target.value;
    this.setState({
      [nameTarget]: valueTarget
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: this.state.name,
      type: this.state.type,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time,
      repeat: this.state.repeat
    };
    fetch('/api/reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => this.setState({ reminder: this.props.reminder.concat(data) }))
      .then(this.props.setView('reminderList', {}))
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Name</label>
            <input name="name" type="text" className="form-control" placeholder="Enter Name" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Type</label>
            <input name="type" type="text" className="form-control" placeholder="Enter Type of Reminder" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Description</label>
            <input name="description" type="text" className="form-control" placeholder="Enter Description" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Date</label>
            <input name="date" type="date" className="form-control" placeholder="mm/dd/yyyy" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Time</label>
            <input name="time" type="time" className="form-control" placeholder="00:00:00" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Repeat Reminder?</label>
            <input name="repeat" type="text" className="form-control" placeholder="Enter Days to Repeat" onChange={this.handleChange} />
            <div className="d-flex justify-content-center"><button type="submit" className="nextButton mt-3 text-uppercase submitButton">Submit</button></div>
          </div>
        </form>
      </div>
    );
  }
}
