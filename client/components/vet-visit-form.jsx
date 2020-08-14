import React from 'react';

export default class VetVisitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      reason: '',
      notes: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModel = this.handleCloseModel.bind(this);
  }

  handleInputChange(event) {
    const nameTarget = event.target.name;
    const valueTarget = event.target.value;
    this.setState({
      [nameTarget]: valueTarget
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      petId: this.props.petId,
      date: this.state.date,
      reason: this.state.reason,
      notes: this.state.notes
    };

    fetch('/api/vetVisits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(() => this.setState({ visits: this.props.visits.concat(data) })
      )
      .catch(error => console.error(error.message));
  }

  handleCloseModel() {
    this.props.setView('list', {});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="bg-white mt-3 p-3">
              <label htmlFor="" className="ml-2 font-weight-bold">Enter date of visit</label>
              <input type="date" name="date" className="form-control" placeholder="00/00/0000" onChange={this.handleInputChange}/>
            </div>
            <div className="bg-white mt-3 p-3">
              <label htmlFor="" className="ml-2 font-weight-bold">Enter reason for Vet Visit</label>
              <textarea type="text" name="reason" className="form-control" placeholder="Routine check up" onChange={this.handleInputChange}></textarea>
            </div>
            <div className="bg-white mt-3 p-3">
              <label htmlFor="" className="ml-2 font-weight-bold ">Enter any notes:</label>
              <textarea type="text" name="notes" className="form-control" placeholder="optional" onChange={this.handleInputChange}></textarea>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="nextButton mt-3 text-uppercase submitButton">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
