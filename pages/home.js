import { withI18next } from '../lib/withI18next';
import Layout from '../src/components/Layout';
import App from '../src/App';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/css/bootstrap-overrides.css';
import '../src/css/app-custom.css';
import '../src/css/app-media.css';

class Home extends React.Component {
  static async getInitialProps ({ req, query }) {
    console.log(req, query);
    return { query: query };
  }

  render () {
    const {t: t, i18n: i18n,  ...rest} = this.props;
    return (
      <Layout routeProps={rest} i18n={i18n} t={t}>
        <h1>Home Page </h1>
        <App i18n={i18n} routeProps={rest.url} t={t} />
      </Layout>
    );
  }
}

export default withI18next(['translations'])(Home)