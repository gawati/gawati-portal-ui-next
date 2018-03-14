import React, { Component } from 'react';
import Link from 'next/link'
import Footer from './Footer';
import { I18n /* , Trans */ } from 'react-i18next';
import {PropsRouteNext} from '../utils/routeshelper';
import Toy from './Toy';

class Layout extends Component {
  render() {
    console.log("Layout:", this.props);
    return (
      <I18n ns="translations">
      {
        (t, { i18n })=>(
          <div>
            {this.props.children}
            <PropsRouteNext component={Footer} i18n={this.props.i18n} routeProps={this.props.routeProps} t={this.props.t} />
          </div>
        )
      }
      </I18n>
    );
  }
}

export default Layout