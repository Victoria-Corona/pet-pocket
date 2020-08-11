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
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/reminder', {
      method: 'POST'
    }).then(res => res.json())
      .then(reminders => this.setState({ reminder: this.props.reminder.concat(reminders) }))
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <div>
        <form action="api/reminder" method="post" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Name</label>
            <input name="name" type="text" className="form-control" placeholder="Enter Name" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Type</label>
            <input name="type" type="text" className="form-control" placeholder="Enter Type of Reminder" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Description</label>
            <input name="description" type="text" className="form-control" placeholder="Enter Description" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Date</label>
            <input name="date" type="date" className="form-control" placeholder="00/00/0000" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Time</label>
            <input name="time" type="time" className="form-control" placeholder="00:00:00" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Repeat Reminder?</label>
            <input name="name" type="text" className="form-control" placeholder="Enter Days to Repeat" onChange={this.handleChange} />
            <div className="d-flex justify-content-center"><button type="submit" className="nextButton mt-3" onSubmit={this.handleSubmit}>SUBMIT</button></div>
          </div>
        </form>
      </div>
    );
  }
}
