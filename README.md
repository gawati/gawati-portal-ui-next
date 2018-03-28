# Setup
- Clone the repo
```
$ git clone git@gitlab.com:bungenicom/gawati/gawati-portal-ui-next.git
```
- Install packages
```
$ npm install
```
- Replace index.js and css-loader-config.js in `node_modules/@zeit/next-css/` with the versions in `lib/next-css-custom/`. 
```
$ cp lib/next-css-custom/index.js node_modules/@zeit/next-css/
$ cp lib/next-css-custom/css-loader-config.js node_modules/@zeit/next-css/
```
- Run the dev server
```
$ npm run dev
```
You migh need to enable CORS if axios requests are failing. https://enable-cors.org/server_apache.html
