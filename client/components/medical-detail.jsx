import React from 'react';

class MedicalDetails extends React.Component {

  render() {

    return (
      <>
        <ul className="nav my-3 d-flex justify-content-between text-uppercase text-white text-center">
          <li className="navButton p-2 ml-2">
            <span onClick={() => this.props.showDetails('details')}>Profile</span>
          </li>
          <li className="navButton active p-2">
            <span>Medical</span>
          </li>
          <li className="navButton p-2 mr-2">
            <span onClick={() => this.props.showVisits('visits')}>Vet</span>
          </li>
        </ul>
        <div className="d-flex flex-wrap">
          <p className="ml-2 mb-1 font-weight-bold">Name of Pet:</p>
          <div className="mb-2 medicalListItem text-uppercase bg-white">
            <div className="d-flex flex-wrap p-1 pl-4">{this.props.params.name}</div>
          </div>
          <p className="ml-2 mb-1 font-weight-bold">Pet Blood Type:</p>
          <div className="mb-2 medicalListItem bg-white">
            <div className="d-flex flex-wrap p-1 pl-4">{this.props.params.bloodType}</div>
          </div>
          <p className="ml-2 mb-1 font-weight-bold">Allergies:</p>
          <div className="mb-2 medicalListItem bg-white">
            <div className="d-flex flex-wrap p-1 pl-4">{this.props.params.allergies}</div>
          </div>
          <p className="ml-2 mb-1 font-weight-bold">Medication:</p>
          <div className="mb-2 medicalListItem bg-white">
            <div className="d-flex flex-wrap p-1 pl-4">{this.props.params.medication}</div>
          </div>
          <p className="ml-2 mb-1 font-weight-bold">Vaccines:</p>
          <div className="mb-2 medicalListItem bg-white">
            <div className="d-flex flex-wrap p-1 pl-4">{this.props.params.vaccines}</div>
          </div>
          <p className="ml-2 mb-1 font-weight-bold">Specialized Diet:</p>
          <div className="mb-2 medicalListItem bg-white">
            <div className="d-flex flex-wrap p-1 pl-4">{this.props.params.specializedDiet}</div>
          </div>
        </div>
      </>
    );
  }
}

export default MedicalDetails;
