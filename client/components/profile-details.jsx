import React from 'react';
import MedicalDetails from './medical-detail';

class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: null,
      currentView: 'details'
    };
    this.showMedical = this.showMedical.bind(this);
  }

  componentDidMount() {
    fetch(`/api/petProfile/${this.props.params.petId}`)
      .then(res => res.json())
      .then(data => this.setState({ pet: data }))
      .catch(err => console.error(err.message));
  }

  showMedical() {
    this.setState({ currentView: 'medical' });
  }

  render() {
    if (!this.state.pet) {
      return null;
    } else if (this.state.currentView === 'details') {
      const birthday = this.state.pet.dateOfBirth;
      const date = new Date(birthday);
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      };
      const birthdayDate = (new Intl.DateTimeFormat('en-US', options).format(date));

      return (
        <div>
          <ul className="nav my-4 d-flex justify-content-between text-uppercase text-white text-center">
            <li className="navButton active p-2 ml-3">
              <a>Profile</a>
            </li>
            <li className="navButton p-2">
              <a onClick={this.showMedical}>Medical</a>
            </li>
            <li className="navButton p-2 mr-3">
              <a>Vet</a>
            </li>
          </ul>
          <div>
            <img src={this.state.pet.imgUrl} className="profilePictureDetail mx-auto d-block" alt="image of pet"/>
          </div>
          <h5 className="text-center text-uppercase font-weight-bold mt-2">
            {this.state.pet.name}
          </h5>
          <div className="bg-white my-5 text-uppercase">
            <div className="p-1"><i className="fas fa-paw ml-2 fa-lg p-3"></i> {this.state.pet.breed}</div>
          </div>
          <div className="bg-white my-5">
            <div className="p-1"><i className="fas fa-birthday-cake ml-2 fa-lg p-3"></i> {birthdayDate}</div>
          </div>
          <div className="bg-white my-5">
            <div className="p-1"><i className="fas fa-pencil-alt ml-2 fa-lg p-3"></i> {this.state.pet.description}</div>
          </div>
        </div>
      );
    } else if (this.state.currentView === 'medical') {
      return <MedicalDetails params={this.state.pet}
      />;
    }

  }
}

export default ProfileDetails;
