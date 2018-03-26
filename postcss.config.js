// Need to export a JS object for use by the plugin for custom CSS variables.
// Use vars.js instead of vars.css.

module.exports = ({ options, env }) => {
  var theme = JSON.parse(options.theme);
  return ({
    plugins: {
      'postcss-css-variables': {
          variables: require("./src/css/themes/"+theme+"/vars.js")
      },
      'postcss-url': {url: 'inline'}
    }
  })
}