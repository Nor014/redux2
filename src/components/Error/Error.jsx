import React from 'react';

export default class Error extends React.Component {
  render() {
    return (
      <div className="error">
        <p className="error__text">{this.props.error}</p>
      </div>
    )
  }
}