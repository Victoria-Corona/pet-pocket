import React from 'react';

class VetVisitDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: null
    };
    this.VetVisitDetail = this.getVetDetails.bind(this);
  }

  componentDidMount() {
    this.getVetDetails();
  }

  getVetDetails() {
    fetch(`/api/vetVisits/${this.props.params.vetVisitId}`)
      .then(res => res.json())
      .then(data => this.setState({ visit: data }))
      .catch(err => console.error(err.message));
  }

  render() {

    if (!this.state.visit) {
      return null;
    } else {

      const vetPrevDate = this.state.visit.date;
      const date = new Date(vetPrevDate);
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      };
      const vetPastAppoint = (new Intl.DateTimeFormat('en-US', options).format(date));

      return (
        <>
          <div className="font-weight-bold pl-3 mt-3">{vetPastAppoint}</div>
          <div className="bg-white h-25 p-3">
            <p className="font-weight-bold text">Reason for visit:</p>
            <p className="text">{this.state.visit.reason}</p>
          </div>
          <div className="bg-white mt-3 p-3">
            <p className="font-weight-bold text">Notes:</p>
            <p className="text">{this.state.visit.notes}</p>
          </div>
          <div className="d-flex justify-content-center">
            <button className="nextButton mt-3 text-uppercase" onClick={() => this.props.setView('list', { })}>back</button>
          </div>
        </>
      );
    }

  }
}

export default VetVisitDetail;
