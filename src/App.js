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
    if (process.env.NODE_ENV === 'development') {
      const path =  './css/themes/' + process.env.REACT_APP_THEME + '/vars.css';
      console.log(path)
      // dynamic(import(`${path}`));
      dynamic(import('./css/themes/default/vars.css'));
    }
    if (typeof registerServiceWorker !== 'undefined') {registerServiceWorker();}
  }
  
  render() {
    return (
      <I18n ns="translations">
      {
        (t, { i18n })=>(
          <Page i18n={i18n} />
        )
      }
      </I18n>
    );
  }
}

export default App;