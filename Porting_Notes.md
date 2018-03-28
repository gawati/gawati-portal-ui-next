# SSR Prototype with Next.js
This document is a compilation of notes and issues encountered while porting Gawati UI from CRA to Next.js 

### Preliminary notes
  - Server-rendered by default
  - Automatic code splitting
  - Simple client-side routing (page based)
  - Implemented with Express
  - Next.js only supports React 16
  - Static file serving. `./static/` is mapped to `/static/`
  - Need to have a page in `./pages/` for every route:
        ./pages/about.js for www.example.com/about 
        ./pages/doc.js for www.example.com/doc 

Note: Code was restructured from CRA and React Router's **Switch** based routing to **Page** based routing.

#### Styles
  - Comes preloaded with their recommended CSS in JS framework called [styled-jsx] allowing CSS rules to be scoped.
  - However, using styled-jsx for Gawati UI involves significant changes.
  - Thus, the traditional file based CSS was retained. To make this work:
        - Used the [next-css] plugin. This some additional config (like using a custom /pages/_document.js). All the styles are bundled into a single styles.css.
        - Custom CSS variables need [postcss-css-variables] plugin.
        - To pass postcss-loader options, next-css had to be tweaked. See the [next-css-PR]
        - To share CSS variables with JS code, we need to have a vars.js file with all variables listed (instead of vars.css). post-css-variables plugin requires a JS object. 

#### Routing & the Link API
  - Link is used to perform client side navigation since a plain the anchor tag will always go to the server.
  - Style prop on Link has no effect. Link is just a wrapper. Style needs to be applied to its children.
  - Link Cannot have onClick(). Use this [link-onClick-workaround] instead.
  - Use Link's 'as' prop for route masking/custom routes. 
  - All routing is page based as mentioned in the preliminary notes. There is no equivalent of React Router's Switch for route based rendering of components.  
  - Apart from /pages, custom routes can be added to the server. This allows Parameterized routing. Parameterised routing is only possible by way of query strings.
  i.e localhost:3000/content/_lang/en/_page/policies needs to be
localhost:3000/content?_lang=en&_page=policies. However, the former can be specified as an alias.
  - Use getInitialProps in pages/xxx.js to get the query and pass it down to other components.
  - getInitialProps is only available in pages/

#### Client Side only (No SSR)
  - Some components are client only. Use [react-no-ssr] wrapper to simplify working with such components.
  - window object
  Next executes server side first, and then client side. However, the window object is present only on the client. Put the code which accesses window in a react component, in `componentDidMount` since this lifecycle method is only executed on the client.
If the simple fact of importing the library is enough to trigger the error, you'll need to replace it with something like if (typeof window !== 'undefined') { require('the-lib'); }
  - TopBar component with the keycloack auth had to use the above strategy to enable it client side only.

#### i18n
Changes to support i18n based on the [with-react-i18next] example. Need to pass the `t` down in the props.

#### Pending
  - Get the 'T' function without having to pass it down in props
See possible work around - https://github.com/zeit/next.js/issues/544#issuecomment-325512576
  - Server side support for clean URLs. Presently, aliased routes are only available client side. A refresh requests the server, where the alias is not present and hence won't work. 
  - Simplify paramterized routes. 
  - Implement language switcher fully
  - Not able to use PDF.js worker. For now, importing directly from "react-pdf" instead of "react-pdf/dist/entry.webpack"
  - Using default language 'en'. Enable full language support.
  - Test Authentication
  - Test translations 

#### Misc
  - next.config.js has some customized webpack config to load images, environment variables, and node modules that require css files.
  - Enable postcss-url inline to support font-awesome. See postcss.config.js 
  - Upgraded react-pdf because there was some known css import issue. In next.js, css files being used by node_modules are troublesome. The upgrade made annotation.css import optional.
  - Can't pass a variable inside dynamic imports - https://github.com/zeit/next.js/issues/2690
  - urls formed with query parameters (like doc&_lang=**) in react get route
  parameter named '_lang'. However, the url for /home in server gets its params from the browser where the param is 'lang' not '_lang'.
  - defaultLang().lang = 'eng'. This breaks <ExprAbstract/> in the function displayDate(abstract.date[1].value, pageLang) which tries to find alpha2 of 'eng'


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)

   [styled-jsx]: <https://github.com/zeit/styled-jsx>
   [next-css]: <https://github.com/zeit/next-plugins/blob/master/packages/next-css>
   [next-css-PR]: <https://github.com/zeit/next-plugins/pull/108>
   [postcss-css-variables]: <https://github.com/MadLittleMods/postcss-css-variables>
   [link-onClick-workaround]: <https://github.com/zeit/next.js/issues/1490#issuecomment-324643124>
   [with-react-i18next]: <https://github.com/zeit/next.js/tree/canary/examples/with-react-i18next>
