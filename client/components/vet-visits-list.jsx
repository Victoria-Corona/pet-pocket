import React from 'react';
import VetVisit from './vet-visits-list-item';
import VetVisitDetail from './vet-visit-detail';
import VetVisitForm from './vet-visit-form';

class VetVisitsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visits: [],
      listView: false,
      view: {
        name: 'list',
        params: {}
      }
    };
    this.getVisits = this.getVisits.bind(this);
    this.setView = this.setView.bind(this);
    this.formView = this.formView.bind(this);
  }

  getVisits() {
    fetch('/api/vetVisits')
      .then(res => res.json())
      .then(data => this.setState({ visits: data }))
      .catch(err => console.error(err.message));
  }

  setView(name, params) {
    const newView = {
      name: name,
      params: params
    };
    this.setState({
      view: newView
    });
  }

  formView() {
    if (this.state.listView) {
      this.setState({
        listView: false
      });
    } else {
      this.setState({
        listView: true
      });
    }
  }

  renderVisitForm() {
    return (
      <VetVisitForm visits={this.state.visits} petId={this.props.params.petId}/>
    );
  }

  componentDidMount() {
    this.getVisits();
  }

  render() {

    if (this.state.listView === true) {
      return (
        this.renderVisitForm()
      );
    }

    if (this.state.view.name === 'list') {
      const listOfVisits = this.state.visits.map(vet => {
        if (vet.petId === this.props.params.petId) {
          return <VetVisit key={vet.vetVisitId}
            vetVisitId={vet.vetVisitId}
            date={vet.date}
            setView={this.setView}
          />;
        }
      });
      return (
        <>
          <ul className="nav my-3 d-flex justify-content-between text-uppercase text-white text-center">
            <li className="navButton p-2 ml-2">
              <span onClick={() => this.props.showDetails('details')}>Profile</span>
            </li>
            <li className="navButton p-2">
              <span onClick={() => this.props.showMedical('medical')}>Medical</span>
            </li>
            <li className="navButton active p-2 mr-2">
              <span >Vet</span>
            </li>
          </ul>
          <div className="p-2 mt-4">
            <div className="d-flex justify-content-center">
              <h5 className="font-weight-bold text-uppercase"><i className="fa fa-plus-circle mr-3" aria-hidden="true" onClick={this.formView}></i>Add a Vet Visit</h5>
            </div>
          </div>
          <div className="mt-4">
            <h6 className="font-weight-bold pl-3">Vet Visits</h6>
            <div className="d-flex justify-content-center flex-wrap">{listOfVisits}</div>
          </div>
        </>
      );
    } else {
      return (
        <VetVisitDetail params={this.state.view.params}/>
      );
    }

  }
}
export default VetVisitsList;
