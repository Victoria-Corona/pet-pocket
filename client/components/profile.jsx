import React from 'react';

class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: null
    };
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile(petId) {
    fetch(`/api/petProfile/${petId}`, {
      method: 'GET'
    })
      .then(res => res.json()).then(data => {
        this.setState({ pet: data });
      })
      .catch(err => console.error(err.message));
  }

  render() {
    if (!this.state.pet) return null;
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
        <div>
          <img src={this.state.pet.imgUrl} className="profilePictureDetail mx-auto d-block" alt="image of pet"/>
        </div>
        <h5 className="text-center text-uppercase font-weight-bold">
          {this.state.pet.name}
        </h5>
        <div className="bg-white my-5 text-uppercase">
          <i className="fas fa-paw ml-4"></i><span className="mr-2 p-2">{this.state.pet.breed}</span>
        </div>
        <div className="bg-white my-5">
          <i className="fas fa-birthday-cake ml-4"></i><span className="mr-2 p-2">{birthdayDate}</span>
        </div>
        <div className="bg-white my-5">
          <i className="fas fa-pencil-alt ml-4"></i><span className="mr-2 p-2">{this.state.pet.description}</span>
        </div>
      </div>
    );
  }
}

export default ProfileDetails;
