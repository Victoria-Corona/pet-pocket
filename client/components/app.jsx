import React from 'react';
import Header from './header';
import ProfileDetails from './profile';
// import Homepage from './homepage';
// import MainMenu from './mainMenu';
import ProfileList from './profile-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'list',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
  }

  setView(name, params) {
    const newView = {
      name: name,
      params: params
    };

    this.setState({
      view: newView
    });
  }

  render() {
    if (this.state.view.name === 'list') {
      return (
        <>
          <Header/>
          <ProfileList setView={this.setView} />
        </>
      );
    } else {
      return (
        <>
          <Header />
          <ProfileDetails params={this.state.view.params} setView={this.setView}/>
        </>
      );
    }
  }
}
