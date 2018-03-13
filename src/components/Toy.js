import React, { Component } from 'react';
import Router from 'next/router';

export default class Toy extends Component {
  render() {
    console.log("From TOY: ", Router.router);
    return (
      <div>
        Displaying Content
      </div>
    );
  }
}