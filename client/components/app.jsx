import React from 'react';
//import Homepage from './homepage';
import MainMenu from './mainMenu';

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
    );
  }
}
