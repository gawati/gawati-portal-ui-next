import { withI18next } from '../lib/withI18next'
import Layout from '../src/components/Layout.js'
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/css/bootstrap-overrides.css';
import '../src/css/app-custom.css';
import '../src/css/app-media.css';

class Doc extends React.Component {
  static async getInitialProps ({ req, query }) {
    return { query: query };
  }

  render () {
    const {t: t, i18n: i18n,  ...rest} = this.props;
    return (
      <Layout routeProps={rest} i18n={i18n} t={t}>
        <h1>Document Page</h1>
      </Layout>
    );
  }
}

export default withI18next(['translations'])(Doc)