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
        <div>
          <div>{this.state.vet.date}</div>
          <div>{lastAppointment}</div>
        </div>
      );
    }
  }
}

export default VetVisits;
