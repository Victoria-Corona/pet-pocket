import React from 'react';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      name: '',
      breed: '',
      dateOfBirth: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });

  }

  handleImgChange(event) {
    this.setState({
      imgUrl: this.fileInput.current.files[0].name
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newProfile = new FormData();
    const name = this.state.name;
    const breed = this.state.breed;
    const dateOfBirth = this.state.dateOfBirth;
    const description = this.state.description;
    const imgUrl = this.state.imgUrl;
    if (name) {
      newProfile.append('name', name);
    }
    if (breed) {
      newProfile.append('breed', breed);
    }
    if (dateOfBirth) {
      newProfile.append('dateOfBirth', dateOfBirth);
    }
    if (description) {
      newProfile.append('description', description);
    }
    if (imgUrl) {
      newProfile.append('imgUrl', imgUrl);
    }
    fetch('api/petProfile', {
      method: 'POST',
      body: newProfile
    }).then(res => res.json())
      .then(profile => this.setState({ profiles: this.state.profiles.concat(profile) }))
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <div>
        <form action="api/petProfile" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="emptyImage mx-auto d-block mt-3" ></div>
            <input name="imgUrl" type="file" className="form-control-file ml-5 mt-3" ref={this.fileInput} onChange={this.handleImgChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4">Name</label>
            <input name="name" type="text" className="form-control" placeholder="Enter Name" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }}>Type of Breed</label>
            <input name="breed" type="text" className="form-control" placeholder="ex.Pug" onChange={this.handleChange} />
            <label htmlFor="" style={{ fontWeight: 'bold' }}>Date of Birth</label>
            <input name="dateOfBirth" type="date" className="form-control" placeholder="00/00/0000" onChange={this.handleChange} />
            <label htmlFor="description" style={{ fontWeight: 'bold' }}>Description</label>
            <input name="description" type="text" className="form-control" placeholder="very friendly, snores" onChange={this.handleChange} />
            <div className="d-flex justify-content-center"><button type="submit" className="nextButton mt-3" >NEXT</button></div>
          </div>
        </form>
      </div>
    );
  }
}
