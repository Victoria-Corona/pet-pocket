import React from 'react';

export default class ProfileForm extends React.Component {

  render() {
    return (
      <div>
        <form action="api/petProfile" method= "post" encType="multipart/form-data" >
          <div className="form-group">
            <div className="emptyImage mx-auto d-block mt-3" ></div>
            <input type="file" className="form-control-file ml-5 mt-3" />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4">Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" />
            <label htmlFor="" style={{ fontWeight: 'bold' }}>Type of Breed</label>
            <input type="text" className="form-control" placeholder="ex.Pug"/>
            <label htmlFor="" style={{ fontWeight: 'bold' }}>Date of Birth</label>
            <input type="date" className="form-control" placeholder="00/00/0000"/>
            <label htmlFor="description" style={{ fontWeight: 'bold' }}>Description</label>
            <input type="text" className="form-control" placeholder="very friendly, snores"/>
            <div className="d-flex justify-content-center"><button type="submit" className="nextButton mt-3" >NEXT</button></div>
          </div>
        </form>
      </div>
    );
  }
}
