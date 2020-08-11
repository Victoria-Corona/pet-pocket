import React from 'react';
import Homepage from './homepage';
import MainMenu from './mainMenu';
import Header from './header';
import Profile from './profile';
// import ProfileDetails from './profile-details';
// import MedicalDetails from './medical-detail';
import ProfileList from './profile-list';
import ReminderList from './reminder-list';
import ProfileForm from './profileForm';
import TodoList from './todo-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'homepage',
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
    } else if (view === 'profileForm') {
      renderPage =
        <>
          <Header />
          <ProfileForm setView={this.setView} />
        </>;
    } else if (view === 'todoList') {
      renderPage =
      <>
        <Header/>
        <TodoList/>
      </>;
    } else if (view === 'reminderList') {
      renderPage =
      <>
        <Header />
        <ReminderList setView={this.setView} />
      </>;
    } else {
      renderPage =
        <>
          <Header />
          <Profile params={this.state.view.params} />
        </>;
    }
    return (
      <>
        {renderPage}
      </>
    );
  }
}
