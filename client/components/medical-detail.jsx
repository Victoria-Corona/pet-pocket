import React from 'react';

class MedicalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medical: null
    };
  }

  componentDidMount() {
    fetch(`/api/pets/${this.props.params.petId}`)
      .then(res => res.json())
      .then(data => this.setState({ medical: data }))
      .catch(err => console.error(err.message));
  }

  render() {
    if (!this.state.medical) {
      return null;
    } else {
      return (
        <>
          <ul className="nav my-4 d-flex justify-content-between text-uppercase text-white text-center">
            <li className="navButton p-2 ml-2">
              <a onClick={() => this.props.showDetails('details')}>Profile</a>
            </li>
            <li className="navButton active p-2">
              <a>Medical</a>
            </li>
            <li className="navButton p-2 mr-2" onClick={() => this.props.showVisits('visits')}>
              <a>Vet</a>
            </li>
          </ul>
          <div className="d-flex flex-wrap">
            <p className="ml-2 mb-1 font-weight-bold">Name of Pet:</p>
            <div className="mb-2 medicalListItem text-uppercase bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.name}</div>
            </div>
            <p className="ml-2 mb-1 font-weight-bold">Pet Blood Type:</p>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.bloodType}</div>
            </div>
            <p className="ml-2 mb-1 font-weight-bold">Allergies:</p>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.allergies}</div>
            </div>
            <p className="ml-2 mb-1 font-weight-bold">Medication:</p>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.medication}</div>
            </div>
            <p className="ml-2 mb-1 font-weight-bold">Vaccines:</p>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.vaccines}</div>
            </div>
            <p className="ml-2 mb-1 font-weight-bold">Specialized Diet:</p>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.specializedDiet}</div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default MedicalDetails;
