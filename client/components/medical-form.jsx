import React from 'react';

class MedicalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodType: '',
      allergies: '',
      medication: '',
      vaccines: '',
      specializedDiet: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const nameTarget = event.target.name;
    const valueTarget = event.target.value;
    this.setState({
      [nameTarget]: valueTarget
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      bloodType: this.state.bloodType,
      allergies: this.state.allergies,
      medication: this.state.medication,
      vaccines: this.state.vaccines,
      specializedDiet: this.state.specializedDiet
    };

    fetch('api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <div>
        <form action="api/pets" method="post">
          <div className="form-group">
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Blood Type</label>
            <input type="text" name="bloodType" className="form-control" placeholder="DEA-1.1" onClick={this.handleInputChange}/>
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Allergies</label>
            <input type="text" name="allergies" className="form-control" placeholder="Optional" onClick={this.handleInputChange}/>
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Medication</label>
            <input type="text" name="medication" className="form-control" placeholder="Optional" onClick={this.handleInputChange}/>
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Vaccines</label>
            <input type="text" name="vaccines" className="form-control" placeholder="Enter Vaccines" onClick={this.handleInputChange}/>
            <label htmlFor="" style={{ fontWeight: 'bold' }} className="mt-4 ml-2">Specialized Diet</label>
            <input type="text" name="diet" className="form-control" placeholder="Optional" onClick={this.handleInputChange}/>
            <div className="d-flex justify-content-center"><button type="submit" className="nextButton mt-3 text-uppercase" onSubmit={this.handleSubmit}>submit</button></div>
          </div>
        </form>
      </div>
    );
  }
}

export default MedicalForm;
