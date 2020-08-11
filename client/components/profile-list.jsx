import React from 'react';
import ProfileListItem from './profile-list-item';
import ProfileForm from './profileForm';

export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      profileView: false
    };
    this.getProfiles = this.getProfiles.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.checkProfileView = this.checkProfileView.bind(this);
  }

  getProfiles() {
    fetch('/api/pets')
      .then(res => res.json())
      .then(profiles =>
        this.setState({
          profiles: profiles
        }))
      .catch(err => console.error(err.message));
  }

  deleteProfile(id) {
    fetch(`/api/pets/${id}`, {
      method: 'DELETE'
    }).then(response => {
      const newProfiles = [...this.state.profiles];
      const index = newProfiles.findIndex(profile => id === profile.id);
      newProfiles.splice(index, 1);
      this.setState({ profiles: newProfiles });
    });
  }

  componentDidMount() {
    this.getProfiles();
  }

  checkProfileView() {
    if (this.state.profileView) {
      this.setState({
        profileView: false
      });
    } else {
      this.setState({
        profileView: true
      });
    }
  }

  render() {
    if (this.state.profileView === false) {
      return this.renderProfileList();
    } else {
      return this.renderNewProfile();
    }
  }

  renderNewProfile() {
    return (
      <ProfileForm profiles={this.state.profiles}/>
    );
  }

  renderProfileList() {
    const listOfProfiles = this.state.profiles.map(profile =>
      <ProfileListItem
        key={profile.petId}
        petId={profile.petId}
        img={profile.imgUrl}
        name={profile.name}
        setView={this.props.setView}/>);
    return (
      <>
        <div className="p-2 mt-4">
          <div className="d-flex justify-content-center">
            <h5 style={{ fontWeight: 'bold' }} onClick={this.checkProfileView}><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>ADD PROFILE</h5>
          </div>
          <div className = "mt-4">
            <h6 style={{ fontWeight: 'bold' }}>PETS IN YOUR POCKET</h6>
            <div className="d-flex justify-content-center flex-wrap">{listOfProfiles}</div>
          </div>
        </div>
      </>
    );
  }
}
