import React from 'react';

class ListItem extends React.Component {

  render() {

    return (
        <div>
            <div className="card-body">
            <h5 className="card-title">{this.props.item}</h5>
            <h6 className="card-subtitle mb-2 text-primary">Date: {this.props.date}</h6>
            <h6 className="card-subtitle mb-2 text-info">Priority: {this.props.priority}</h6>
            <p className="card-text">{this.props.notes}</p>
            </div>
        </div>
    )
  }
};

export default ListItem;
