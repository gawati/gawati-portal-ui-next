import { withI18next } from '../lib/withI18next'
import Layout from '../src/components/Layout.js'
import Toy from '../src/components/Toy.js'
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/css/bootstrap-overrides.css';
import '../src/css/app-custom.css';
import '../src/css/app-media.css';
import Link from 'next/link';
import Router from 'next/router';

export default withI18next(['translations'])(({ t, initialI18nStore }) => (
  <Layout routeProps={Router} i18n={initialI18nStore} t={t}>
    <h1>Content Page</h1>
    <Toy />
  </Layout>
))