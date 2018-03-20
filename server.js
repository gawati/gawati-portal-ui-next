const express = require('express')
const path = require('path')
const next = require('next')

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const { i18nInstance } = require('./i18n')

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// init i18next with serverside settings
// using i18next-express-middleware
i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en'],
    ns: ['translations'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/static/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/static/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance))

        // serve locales for client
        server.use('/static/locales', express.static(path.join(__dirname, 'static/locales')))

        // missing keys
        server.post('/static/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance))

        server.get('/_lang/:lang', (req, res) => {
          const mergedQuery = Object.assign({}, req.query, req.params)
          return app.render(req, res, '/home', mergedQuery);
        })

        server.get('/', (req, res) => {
          res.redirect(301, '/_lang/'+req.language);
        })

        server.get('content/_lang/:lang/_page/:page', (req, res) => {
          const mergedQuery = Object.assign({}, req.query, req.params)
          return app.render(req, res, '/content', mergedQuery);
        })

        // use next.js
        server.get('*', (req, res) => handle(req, res))

        server.listen(3000, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
      .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
      })
  })