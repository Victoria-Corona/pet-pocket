import React from 'react';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'homepage'
    };
  }

  render() {
    const setView = this.props.setView;
    return (
      <div className="homepage">
        <div className="logo">
          <img src={'images/PetPocketV2.png'} className="logoImage"></img>
        </div>
        <div className="homepageNav">
          <button className="petOwner" onClick={() => setView('mainMenu', {})}>PET OWNER</button>
          <button className="petSitter" onClick={() => setView('mainMenu', {})}>PET SITTER</button>
        </div>
      </div>
    );
  }
}
