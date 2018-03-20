import React, { Component } from 'react';
import Link from 'next/link'
import Footer from './Footer';
import { I18n /* , Trans */ } from 'react-i18next';
import {PropsRouteNext} from '../utils/routeshelper';

class Layout extends Component {
  render() {
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