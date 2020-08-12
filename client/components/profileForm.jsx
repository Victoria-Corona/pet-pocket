import React from 'react';

// import MedicalForm from './medical-form';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      breed: '',
      dateOfBirth: '',
      description: '',
      imgFilePreview: null,
      image: '',
      bloodType: '',
      allergies: '',
      medication: '',
      vaccines: '',
      specializedDiet: '',
      mode: 'basic'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.imageFileInput = React.createRef();
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
      image: event.target.files[0],
      imgFilePreview: URL.createObjectURL(event.target.files[0])
    });
  }

  handleImgClick() {
    this.imageFileInput.current.click();
  }

  handleButtonClick() {
    this.setState({
      mode: 'medical'
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newProfile = new FormData();
    const name = this.state.name;
    const breed = this.state.breed;
    const dateOfBirth = this.state.dateOfBirth;
    const description = this.state.description;
    const image = this.state.image;
    const bloodType = this.state.bloodType;
    const allergies = this.state.allergies;
    const vaccines = this.state.vaccines;
    const specializedDiet = this.state.specializedDiet;
    const medication = this.state.medication;

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
    if (image) {
      newProfile.append('image', image);
    }
    if (bloodType) {
      newProfile.append('bloodType', bloodType);
    }
    if (allergies) {
      newProfile.append('allergies', allergies);
    }
    if (vaccines) {
      newProfile.append('vaccines', vaccines);
    }
    if (specializedDiet) {
      newProfile.append('specializedDiet', specializedDiet);
    }
    if (medication) {
      newProfile.append('medication', medication);
    }
    fetch('api/pets', {
      method: 'POST',
      body: newProfile
    }).then(res => res.json())
      .then(() => this.props.setView('profileList', {}))
      .catch(error => console.error(error.message));
  }

  render() {
    if (this.state.mode === 'medical') {
      return (
        <div>
          <form key={this.state.mode} onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Blood Type</label>
              <input type="text" name="bloodType" className="form-control" placeholder="DEA-1.1" onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Allergies</label>
              <input type="text" name="allergies" className="form-control" placeholder="Optional" onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Medication</label>
              <input type="text" name="medication" className="form-control" placeholder="Optional" onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Vaccines</label>
              <input type="text" name="vaccines" className="form-control" placeholder="Enter Vaccines" onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Specialized Diet</label>
              <input type="text" name="specializedDiet" className="form-control" placeholder="Optional" onChange={this.handleChange} />
              <div className="d-flex justify-content-center"><button type="submit" className="nextButton mt-3 text-uppercase" >submit</button></div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <form key={this.state.mode}>
            <div className="form-group">
              <input name="image" type="file" accept="image/*" className="form-control-file ml-5 mt-3" ref={this.imageFileInput} onChange={this.handleImgChange} style={{ display: 'none' }} />
              <div className="img-container">
                <img className="filledImage mx-auto d-block mt-3" onClick={this.handleImgClick} src={this.state.imgFilePreview} ></img>
                <i className="fa fa-plus-circle fa-2x img-icon" aria-hidden="true"></i></div>
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Name</label>
              <input name="name" type="text" className="form-control" placeholder="Enter Name" onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">Type of Breed</label>
              <input name="breed" type="text" className="form-control" placeholder="ex.pug" onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">Date of Birth</label>
              <input name="dateOfBirth" type="date" className="form-control" placeholder="00/00/0000" onChange={this.handleChange} />
              <label htmlFor="description" style={{ fontWeight: 'bold' }} className="ml-2">Description</label>
              <input name="description" type="text" className="form-control" placeholder="very friendly, snores" onChange={this.handleChange} />
              <div className="d-flex justify-content-center"><button type="button" className="nextButton mt-3" onClick={() => this.handleButtonClick()}>NEXT</button></div>
            </div>
          </form>
        </div>
      );
    }

  }
}
