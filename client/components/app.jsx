import React from 'react';
import Homepage from './homepage';
import MainMenu from './mainMenu';
import Header from './header';
import ProfileDetails from './profile-details';
// import MedicalDetails from './medical-detail';
import ProfileList from './profile-list';
import ReminderList from './reminder-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'reminderList',
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
    const view = this.state.view.name;
    let renderPage;
    if (view === 'homepage') {
      renderPage = <Homepage setView={this.setView} />;
    } else if (view === 'mainMenu') {
      renderPage = <MainMenu setView={this.setView} />;
    } else if (view === 'profileList') {
      renderPage =
      <>
        <Header />
        <ProfileList setView={this.setView} />
      </>;
    } else if (view === 'profileDetails') {
      renderPage =
      <>
        <Header />
        <ProfileDetails params={this.state.view.params} setView={this.setView} />
      </>;
    } else if (view === 'reminderList') {
      renderPage =
      <>
        <Header />
        <ReminderList setView={this.setView} />
      </>;
    }
    return (
      <>
        <div>
          {renderPage}
        </div>
      </>
    );
  }
}
