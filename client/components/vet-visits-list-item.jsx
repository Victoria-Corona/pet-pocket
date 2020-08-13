import React from 'react';

class VetVisit extends React.Component {

  render() {

    const vetDate = this.props.date;
    const date = new Date(vetDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    const vetPastAppoint = (new Intl.DateTimeFormat('en-US', options).format(date));

    return (
      <div className="vetVistListItem bg-white pl-3 mt-3" onClick={() => this.props.setView('vetDetails', { vetVisitId: this.props.vetVisitId })}>
        <span>{vetPastAppoint}</span>
      </div>

    );
  }
}

export default VetVisit;
