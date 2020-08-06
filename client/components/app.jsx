import React from 'react';
//import Homepage from './homepage';
import MainMenu from './mainMenu';
import ProfileList from './profile-list';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
        <MainMenu />
      </>
      //    return this.state.isLoading
      // ? <h1>Testing connections...</h1>
      // : <h1>{this.state.message.toUpperCase()}</h1>;
      <div>
        <ProfileList/>
      </div>

    );
  }
}
