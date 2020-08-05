import React from 'react';

export default function Homepage(props) {
  return (
    <div className="homepage">
      <div className="logo">
        <img src={'../../server/public/images/PetPocketV2.png'}></img>
      </div>
      <div className="homepageNav">
        <button className="petOwner">PET OWNER</button>
        <button className="petSitter">PET SITTER</button>
      </div>
    </div>
  );
}
