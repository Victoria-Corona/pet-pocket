import React from 'react';

export default class ProfileFormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.petProfile.name,
      breed: this.props.petProfile.breed,
      dateOfBirth: this.props.petProfile.dateOfBirth,
      description: this.props.petProfile.description,
      imgFilePreview: this.props.petProfile.imgUrl,
      image: null,
      bloodType: this.props.petProfile.bloodType,
      allergies: this.props.petProfile.allergies,
      medication: this.props.petProfile.medication,
      vaccines: this.props.petProfile.vaccines,
      specializedDiet: this.props.petProfile.specializedDiet,
      mode: 'basic'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.imageFileInput = React.createRef();
  }

  handleButtonClick() {
    this.setState({
      mode: 'medical'
    });
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
    const medication = this.state.medication;
    const specializedDiet = this.state.specializedDiet;

    if (name) {
      newProfile.append('name', name);
    }
    if (breed) {
      newProfile.append('breed', breed);
    }
    if (dateOfBirth) {
      let dt = new Date(dateOfBirth);
      dt = dt.toISOString();

      newProfile.append('dateOfBirth', dt);

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

    fetch(`/api/pets/${this.props.petProfile.petId}`, {
      method: 'PUT',
      body: newProfile
    })
      .then(res => res.json())
      .then(() => this.props.changeView('profileList'))
      .catch(error => console.error(error.message));
  }

  handleDelete() {
    fetch(`/api/pets/${this.props.petProfile.petId}`, {
      method: 'DELETE'
    })
      .then(this.props.changeView('profileList'))
      .catch(error => console.error(error.message));

  }

  render() {
    const birthday = this.state.dateOfBirth;
    const date = new Date(birthday);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const birthdayDate = (new Intl.DateTimeFormat('en-US', options).format(date)).split('/');
    const dateOfBirth = `${birthdayDate[2]}-${birthdayDate[0]}-${birthdayDate[1]}`;

    if (this.state.mode === 'medical') {
      return (
        <div>
          <form key={this.state.mode} onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Blood Type</label>
              <input type="text" name="bloodType" className="form-control" placeholder="DEA-1.1" value={this.state.bloodType || ''} onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Allergies</label>
              <input type="text" name="allergies" className="form-control" placeholder="Optional" value={this.state.allergies || ''} onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Medication</label>
              <input type="text" name="medication" className="form-control" placeholder="Optional" value={this.state.medication || ''} onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Vaccines</label>
              <input type="text" name="vaccines" className="form-control" placeholder="Enter Vaccines" value={this.state.vaccines || ''} onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Specialized Diet</label>
              <input type="text" name="specializedDiet" className="form-control" placeholder="Optional" value ={this.state.specializedDiet || ''} onChange={this.handleChange} />
              <div>
                <div className="d-flex justify-content-center mt-2"><button type="button" className="profileButtonDelete mt-3 text-uppercase" onClick={() => this.handleDelete()} >DELETE</button><button type="submit" className="profileButtonUpdate mt-3 text-uppercase" >UPDATE</button></div>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <form key={this.state.mode} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input name="image" type="file" accept="image/*" className="form-control-file ml-5 mt-3" ref={this.imageFileInput} onChange={this.handleImgChange} style={{ display: 'none' }} />
              <div className="img-container">
                <img className="filledImage mx-auto d-block mt-3" onClick={this.handleImgClick} src={this.state.imgFilePreview} ></img>
                <i className="fa fa-plus-circle fa-2x img-icon" aria-hidden="true"></i></div>
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Name</label>
              <input name="name" type="text" className="form-control" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">Type of Breed</label>
              <input name="breed" type="text" className="form-control" value={this.state.breed} onChange={this.handleChange} />
              <label htmlFor="" style={{ fontWeight: 'bold' }} className="ml-2">Date of Birth</label>
              <input name="dateOfBirth" type="date" className="form-control" placeholder="00/00/0000" value={dateOfBirth} onChange={this.handleChange} />
              <label htmlFor="description" style={{ fontWeight: 'bold' }} className="ml-2">Description</label>
              <input name="description" type="text" className="form-control" placeholder="very friendly, snores" value={this.state.description} onChange={this.handleChange} />
              <div className="d-flex justify-content-center"><button type="button" className="nextButton mt-3" onClick={() => this.handleButtonClick()} >NEXT</button></div>
            </div>
          </form>
        </div>
      );
    }
  }
}
