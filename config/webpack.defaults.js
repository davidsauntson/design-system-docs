// This file is created and managed by Bridgetown.
// Instead of editing this file, add your overrides to `webpack.config.js`
//
// To update this file to the latest version provided by Bridgetown,
// run `bridgetown webpack update`. Any changes to this file will be overwritten
// when an update is applied hence we strongly recommend adding overrides to
// `webpack.config.js` instead of editing this file.
//
// Shipped with Bridgetown v0.21.0

const path = require("path");
const rootDir = path.resolve(__dirname, "..");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  entry: {
    main: path.resolve(rootDir, "frontend", "javascript", "index.js"),
  },
  devtool: "source-map",
  // Set some or all of these to true if you want more verbose logging:
  stats: {
    modules: false,
    builtAt: false,
    timings: false,
    children: false,
  },
  output: {
    path: path.resolve(rootDir, "output", "_bridgetown", "static", "js"),
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve(rootDir, "frontend", "javascript"),
      path.resolve(rootDir, "frontend", "styles"),
      path.resolve(rootDir, "node_modules"),
    ],
    alias: {
      bridgetownComponents: path.resolve(rootDir, "src", "_components"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].[contenthash].css",
    }),
    new ManifestPlugin({
      fileName: path.resolve(rootDir, ".bridgetown-webpack", "manifest.json"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              [
                "@babel/plugin-transform-runtime",
                {
                  helpers: false,
                },
              ],
              ["@babel/plugin-proposal-private-methods", { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: (url) => !url.startsWith("/"),
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: false,
                includePaths: [path.resolve(rootDir, "src/_components")],
              },
            },
          },
        ],
      },

      {
        test: /\.woff2?$|\.ttf$|\.eot$/,
        loader: "file-loader",
        options: {
          name: "[name]-[contenthash].[ext]",
          outputPath: "../fonts",
          publicPath: "../fonts",
        },
      },
      {
        test: /\.png?$|\.gif$|\.jpg$|\.svg$/,
        loader: "file-loader",
        options: {
          name: "[path][name]-[contenthash].[ext]",
          outputPath: "../",
          publicPath: "../",
        },
      },
    ],
  },
};
