import React from 'react';

export default function MainMenu(props) {
  return (
    <div className="mainMenu">
      <div className="navBar">
        <i className="fas fa-bars"></i>
        <span className="heading">PET POCKET</span>
        <i className="fas fa-undo-alt"></i>
      </div>
      <div className="navMenu">
        <div className="petProfiles">
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
