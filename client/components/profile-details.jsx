import React from 'react';
// import MedicalDetails from './medical-detail';

class ProfileDetails extends React.Component {

  render() {
    if (!this.props.params) {
      return null;
    } else {
      const birthday = this.props.params.dateOfBirth;
      const date = new Date(birthday);
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      };
      const birthdayDate = (new Intl.DateTimeFormat('en-US', options).format(date));

      return (
        <div>
          <ul className="nav my-3 d-flex justify-content-between text-uppercase text-white text-center">
            <li className="navButton active p-2 ml-2">
              <span>Profile</span>
            </li>
            <li className="navButton p-2">
              <span onClick={() => this.props.showMedical('medical')}>Medical</span>
            </li>
            <li className="navButton p-2 mr-2">
              <span onClick={() => this.props.showVisits('visits')}>Vet</span>
            </li>
          </ul>
          <div>
            <i className="fas fa-edit fa-2x d-flex justify-content-end" onClick={() => this.props.showVisits('edit')}></i>
            <img src={this.props.params.imgUrl} className="profilePictureDetail mx-auto d-block" alt="image of pet"/>
          </div>
          <h5 className="text-center text-uppercase font-weight-bold mt-2">
            {this.props.params.name}
          </h5>
          <div className="bg-white mt-3 mb-4 text-uppercase">
            <div className="p-1"><i className="fas fa-paw ml-2 fa-lg p-3"></i> {this.props.params.breed}</div>
          </div>
          <div className="bg-white mb-4">
            <div className="p-1"><i className="fas fa-birthday-cake ml-2 fa-lg p-3"></i> {birthdayDate}</div>
          </div>
          <div className="bg-white mb-4">
            <div className="p-1"><i className="fas fa-pencil-alt ml-2 fa-lg p-3"></i> {this.props.params.description}</div>
          </div>
        </div>
      );
    }
  }
}

export default ProfileDetails;
