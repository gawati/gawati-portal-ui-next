import { withI18next } from '../lib/withI18next'
import App from '../src/App';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/css/bootstrap-overrides.css';
import '../src/css/app-custom.css';
import '../src/css/app-media.css';

import Link from 'next/link'

export default withI18next(['translations'])(({ t, initialI18nStore }) => (
    <App />
))