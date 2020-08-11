import React from 'react';
import MedicalDetails from './medical-detail';
import ProfileDetails from './profile-details';
import ProfileFormEdit from './profileForm-edit';
// import ProfileForm from './profileForm';

import VetVisitsList from './vet-visits-list';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petInfo: null,
      currentView: 'details'
    };
    this.showMedical = this.showMedical.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.showVisits = this.showVisits.bind(this);
    this.showHistory = this.showHistory.bind(this);
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

  showMedical(params) {
    this.setState({ currentView: params });
  }

  showDetails(params) {
    this.setState({ currentView: params });
  }

  showVisits(params) {
    this.setState({ currentView: params });
  }

  showHistory(params) {
    this.setState({ currentView: params });
  }

  render() {
    if (!this.state.petInfo) {
      return null;
    } else if (this.state.currentView === 'medical') {
      return <MedicalDetails showDetails={this.showDetails} showVisits={this.showVisits} params={this.state.petInfo}/>;
    } else if (this.state.currentView === 'visits') {
      return <VetVisitsList showDetails={this.showDetails} showMedical={this.showMedical} params={this.state.petInfo} showHistory={this.showHistory}/>;
    } else if (this.state.currentView === 'edit') {
      return <ProfileFormEdit petProfile={this.state.petInfo} petId={this.props.params.petId}/>;
    } else if (this.state.currentView === 'details') {
      return <ProfileDetails showMedical={this.showMedical} showVisits={this.showVisits} params={this.state.petInfo}/>;
    }
  }

}
export default Profile;
