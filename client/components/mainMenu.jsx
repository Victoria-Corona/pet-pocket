import React from 'react';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'mainMenu'
    };
  }

  render() {
    const setView = this.props.setView;
    return (
      <div>

        <div className="p-4 header-background d-flex justify-content-between align-items-center">
          <i className="fas fa-bars fa-2x"></i>
          <span className="title">PET POCKET</span>
          <i className="fas fa-undo-alt fa-2x" onClick={() => setView('homepage', {})}></i>
        </div>

        <div>
          <div className="petProfiles" onClick={() => setView('profileList', {})}>
            <div className="blueSquare">
              <i className="fa fa-paw fa-2x" aria-hidden="true"></i>
            </div>
            <p className="control">PET PROFILES</p>
          </div>

          <div className="todoList">
            <div className="blueSquare blueSquare2">
              <i className="fas fa-clipboard-list fa-2x"></i>
            </div>
            <p className="control">TODO LIST</p>
          </div>

          <div className="addAPet">
            <div className="blueSquare">
              <i className="fas fa-plus-circle fa-2x"></i>
            </div>
            <p className="control">ADD A PET</p>
          </div>

          <div className="alertMe">
            <div className="blueSquare">
              <i className="fas fa-exclamation-circle fa-2x"></i>
            </div>
            <p className="control">ALERT ME</p>
          </div>
        </div>

      </div>
    );
  }
}
