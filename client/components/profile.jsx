import React from 'react';
import MedicalDetails from './medical-detail';
import ProfileDetails from './profile-details';
import ProfileFormEdit from './profileForm-edit';
// import ProfileForm from './profileForm';

import VetVisitsList from './vet-visits-list';
import ProfileList from './profile-list';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petInfo: null,
      currentView: 'details'
    };
    this.changeView = this.changeView.bind(this);

  }

  componentDidMount() {
    this.getPetProfile();
  }

  getPetProfile() {
    fetch(`/api/pets/${this.props.params.petId}`)
      .then(res => res.json())
      .then(data => this.setState({ petInfo: data }))
      .catch(err => console.error(err.message));
  }

  changeView(params) {
    this.setState({ currentView: params });
  }

  render() {
    if (!this.state.petInfo) {
      return null;
    } else if (this.state.currentView === 'medical') {
      return <MedicalDetails showDetails={this.changeView} showVisits={this.changeView} params={this.state.petInfo}/>;
    } else if (this.state.currentView === 'visits') {
      return <VetVisitsList showDetails={this.changeView} showMedical={this.changeView} params={this.state.petInfo} showHistory={this.changeView}/>;
    } else if (this.state.currentView === 'edit') {
      return <ProfileFormEdit petProfile={this.state.petInfo} changeView={this.changeView} petId={this.props.params.petId}/>;
    } else if (this.state.currentView === 'details') {
      return <ProfileDetails showMedical={this.changeView} showVisits={this.changeView} params={this.state.petInfo}/>;
    } else if (this.state.currentView === 'profileList') {
      return <ProfileList changeView = {this.changeView} petId={this.props.params.petId}/>;
    }
  }

}
export default Profile;
