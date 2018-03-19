const resolve = require('resolve')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const webpack = require('webpack');
require('dotenv').config()

let newConfig = withCSS({
  postcssLoaderOptions: {
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME)
      }
    }
  },

  webpack(config, options) {
    
    const { dir, isServer } = options
    config.externals = []

    if (isServer) {
      config.externals.push((context, request, callback) => {
        resolve(request, { basedir: dir, preserveSymlinks: true }, (err, res) => {
          if (err) {
            return callback()
          }

          // Next.js by default adds every module from node_modules to
          // externals on the server build. This brings some undesirable
          // behaviors because we can't use modules that require CSS files like
          // `react-spinkit`. See https://github.com/zeit/next-plugins/issues/70
          //
          // The lines below blacklist webpack itself (that cannot be put on
          // externals) and `react-spinkit`.
          if (
            res.match(/node_modules[/\\].*\.js/)
            && !res.match(/node_modules[/\\]webpack/)
            && !res.match(/node_modules[/\\]react-spinkit/)
          ) {
            return callback(null, `commonjs ${request}`)
          }

          callback()
        })
      })
    }

    //To handle images
    config.module.rules.push(
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: "file-loader",
              publicPath: "/_next/static/images/",
              outputPath: "static/images/",
              name: "[name]-[hash].[ext]"
            },
          },
        ], 
      }
    )
    
    //To support .env 
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.REACT_APP_THEME': JSON.stringify(process.env.REACT_APP_THEME)
      })
    )
    return config
  }
  
})

module.exports = newConfig