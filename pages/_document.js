// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="shortcut icon" href="/_next/static/favicon.ico" />

          <link rel="stylesheet" href="/_next/static/style.css" />
          <script dangerouslySetInnerHTML={{ __html: `
            gawati = {
              GAWATI_PROXY: "http://localhost",
              GAWATI_DOCUMENT_SERVER: "http://localhost"
            };
          `}} />
          <title>African Law Library</title>
        </Head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}