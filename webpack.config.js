var path = require('path');
var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });
module.exports = function(env) {
  if (env.browser) {
    return {
      entry: {
        client: "./src/client",
      },
      output: {
        path: path.resolve(__dirname, "dist/static/js"),
        filename: "[name].bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: [
              path.resolve(__dirname, "src"),
            ],
            loader: "babel-loader",
            query: {
              "presets": [
                "es2015",
                "stage-0",
                "react",
              ],
              "plugins": [
                "styled-jsx/babel"
              ]
            }
          }
        ]
      },
      resolve: {
        modules: [
          "node_modules",
          path.resolve(__dirname, "src"),
        ],
        extensions: [".js", ".json", ".jsx", ".css"]
      },
      context: __dirname
    }
  } else if (env.server) {
    return {
      entry: {
        client: "./src/server"
      },
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: [
              path.resolve(__dirname, "src"),
            ],
            loader: "babel-loader",
            query: {
              "presets": [
                "es2015",
                "stage-0",
                "react",
              ],
              "plugins": [
                "styled-jsx/babel"
              ]
            }
          }
        ]
      },
      target: 'node',
      node: {
        __dirname: false,
        __filename: false,
      },
      externals: nodeModules,
      context: __dirname
    }
  }
}
