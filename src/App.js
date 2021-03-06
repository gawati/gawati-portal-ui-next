import React, { Component } from 'react';
import './App.css';
import { I18n /* , Trans */ } from 'react-i18next';
import Page from './components/Page';
import dynamic from 'next/dynamic';

//Next.js executes server side first where window is not available.
//https://github.com/zeit/next.js/wiki/FAQ
if (typeof window !== 'undefined') { 
  require('./registerServiceWorker');
  require('./polyfills');
 }

class App extends Component {
  componentDidMount() {
    if (typeof registerServiceWorker !== 'undefined') {registerServiceWorker();}
  }
  
  render() {
    return (
      <I18n ns="translations">
      {
        (t, { i18n })=>(
          <Page i18n={i18n} routeProps={this.props.routeProps} t={this.props.t} />
        )
      }
      </I18n>
    );
  }
}

export default App;