import React from 'react';
import ProfileListItem from './profile-list-item';

export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  getProfiles() {
    fetch('/api/petProfile')
      .then(res => res.json())
      .then(profiles =>
        this.setState({
          profiles: profiles
        }))
      .catch(err => console.error(err.message));
  }

  componentDidMount() {
    this.getProfiles();
  }

  render() {
    const listOfProfiles = this.state.profiles.map(profile =>
      <ProfileListItem
        key={profile.petId}
        img={profile.imgUrl}
        name={profile.name} />);
    return (
      <div className="p-2 mt-4">
        <div className="d-flex justify-content-center">
          <h5 style={{ fontWeight: 'bold' }}><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>ADD PROFILE</h5>
        </div>
        <div className = "mt-4">
          <h5 style={{ fontWeight: 'bold' }}>PETS IN YOUR POCKET</h5>
          <div className="d-flex justify-content-center flex-wrap">{listOfProfiles}</div>
        </div>
      </div>
    );
  }
}
