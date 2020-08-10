import React from 'react';

class VetVisits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vet: null
    };
  }

  componentDidMount() {
    fetch(`api/vetVisits/${this.props.params.petId}`)
      .then(res => res.json())
      .then(data => this.setState({ vet: data }))
      .catch(err => console.error(err.message));
  }

  render() {
    if (!this.state.vet) {
      return null;
    } else {
      const appointment = this.state.vet.date;
      const date = new Date(appointment);
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      };
      const lastAppointment = (new Intl.DateTimeFormat('en-US', options).format(date));

      return (
        <>
          <ul className="nav my-3 d-flex justify-content-between text-uppercase text-white text-center">
            <li className="navButton p-2 ml-2">
              <span onClick={() => this.props.showDetails('details')}>Profile</span>
            </li>
            <li className="navButton p-2">
              <span onClick={() => this.props.showMedical('medical')}>Medical</span>
            </li>
            <li className="navButton p-2 mr-2 active">
              <span>Vet</span>
            </li>
          </ul>
          <div className="font-weight-bold pl-3">{lastAppointment}</div>
          <div className="bg-white mt-3 h-25 p-3">
            <p className="font-weight-bold text">Reason for visit:</p>
            <p className="text">{this.state.vet.reason}</p>
          </div>
          <div className="bg-white mt-3 p-3">
            <p className="font-weight-bold text">Notes:</p>
            <p className="text">{this.state.vet.notes}</p>
          </div>
        </>
      );
    }
  }
}

export default VetVisits;
