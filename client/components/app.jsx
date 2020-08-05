import React from 'react';
import ProfileDetails from './profile';
import ProfileList from './profile-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'details',
        params: {}
      }
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
  }

  render() {
    if (this.state.view.name === 'list') {
      return (
        <ProfileList/>
      );
    } else {
      return (
        <ProfileDetails/>
      );
    }
  }
}
