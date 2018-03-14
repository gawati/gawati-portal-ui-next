import React, { Component } from 'react';
import Router from 'next/router';

export default class Toy extends Component {
  render() {
    return (
      <div>
        <h4>Displaying Content:</h4> 
        <p>Language from params: {this.props.url.query._lang}</p>
      </div>
    );
  }
}