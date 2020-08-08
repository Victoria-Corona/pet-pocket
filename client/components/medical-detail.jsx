import React from 'react';
import ProfileDetails from './profile-details';

class MedicalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medical: null,
      currentView: 'medical'
    };
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    fetch(`/api/petProfile/${this.props.params.petId}`)
      .then(res => res.json())
      .then(data => this.setState({ medical: data }))
      .catch(err => console.error(err.message));
  }

  showDetails(params) {
    this.setState({ currentView: 'details' });
  }

  render() {

    if (!this.state.medical) {
      return null;
    } else if (this.state.currentView === 'medical') {
      return (
        <>
          <ul className="nav my-4 d-flex justify-content-between text-uppercase text-white text-center">
            <li className="navButton p-2 ml-2">
              <a onClick={this.showDetails}>Profile</a>
            </li>
            <li className="navButton active p-2">
              <a>Medical</a>
            </li>
            <li className="navButton p-2 mr-2">
              <a>Vet</a>
            </li>
          </ul>
          <div className="d-flex flex-wrap">
            <h5 className="ml-2 mb-1">Name of Pet:</h5>
            <div className="mb-2 medicalListItem text-uppercase bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.name}</div>
            </div>
            <h5 className="ml-2 mb-1">Pet Blood Type:</h5>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.bloodType}</div>
            </div>
            <h5 className="ml-2 mb-1">Allergies:</h5>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.allergies}</div>
            </div>
            <h5 className="ml-2 mb-1">Medication:</h5>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.medication}</div>
            </div>
            <h5 className="ml-2 mb-1">Vaccines:</h5>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.vaccines}</div>
            </div>
            <h5 className="ml-2 mb-1">Specialized Diet:</h5>
            <div className="mb-2 medicalListItem bg-white">
              <div className="d-flex flex-wrap p-1 pl-4">{this.state.medical.specializedDiet}</div>
            </div>
          </div>
        </>
      );
    } else if (this.state.currentView === 'details') {
      return <ProfileDetails params={this.state.medical}/>;
    }
  }
}

export default MedicalDetails;
