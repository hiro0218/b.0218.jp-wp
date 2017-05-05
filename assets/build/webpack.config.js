'use strict'; // eslint-disable-line

const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CopyGlobsPlugin = require('copy-globs-webpack-plugin');
const config = require('./config');

const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';
const sourceMapQueryStr = (config.enabled.sourceMaps) ? '+sourceMap' : '-sourceMap';

if (config.enabled.watcher) {
  jsLoader.use.unshift('monkey-hot?sourceType=module');
}

let webpackConfig = {
  context: config.paths.assets,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  output: {
    path: config.paths.dist,
    publicPath: config.publicPath,
    filename: `scripts/${assetsFilenames}.js`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        include: config.paths.assets,
        loader: 'babel',
      },
      {
        test: /\.js$/,
        exclude: [/(node_modules|bower_components)(?![/|\\](bootstrap|foundation-sites))/],
        loader: 'buble',
        options: { objectAssign: 'Object.assign' },
      },
      {
        test: /\.css$/,
        include: config.paths.assets,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            `css?${sourceMapQueryStr}`,
            'postcss',
            'csscomb',
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: config.paths.assets,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            `css?${sourceMapQueryStr}`,
            'postcss',
            'csscomb',
            `resolve-url?${sourceMapQueryStr}`,
            `sass?${sourceMapQueryStr}`,
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        include: config.paths.assets,
        loader: 'file',
        options: {
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
      {
        test: /\.(ttf|eot)$/,
        include: config.paths.assets,
        loader: 'file',
        options: {
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
      {
        test: /\.woff2?$/,
        include: config.paths.assets,
        loader: 'url',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
        include: /node_modules|bower_components/,
        loader: 'file',
        options: {
          name: `vendor/${config.cacheBusting}.[ext]`,
        },
      },
    ],
  },
  resolve: {
    modules: [
      config.paths.assets,
      'node_modules',
      'bower_components',
    ],
    enforceExtension: false,
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  // externals: {
    // jquery: 'jQuery',
  // },
  plugins: [
    new CleanPlugin([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    new CopyGlobsPlugin({
      // It would be nice to switch to copy-webpack-plugin, but unfortunately it doesn't
      // provide a reliable way of tracking the before/after file names
      pattern: config.copy,
      output: `[path]${assetsFilenames}.[ext]`,
      manifest: config.manifest,
    }),
    new ExtractTextPlugin({
      filename: `styles/${assetsFilenames}.css`,
      allChunks: true,
      disable: (config.enabled.watcher),
    }),
    // new webpack.ProvidePlugin({
    // $: 'jquery',
    // jQuery: 'jquery',
    // 'window.jQuery': 'jquery',
    // Tether: 'tether',
    // 'window.Tether': 'tether',
    // }),
    new webpack.DefinePlugin({
      WEBPACK_PUBLIC_PATH: (config.enabled.watcher)
        ? JSON.stringify(config.publicPath)
        : false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: config.enabled.optimize,
      debug: config.enabled.watcher,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: config.paths.dist },
        context: config.paths.assets,
        postcss: [
          mqpacker({ sort: true }),
          autoprefixer({ browsers: config.browsers }),
        ],
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: { failOnWarning: false, failOnError: true },
      },
    }),
  ],
};

/* eslint-disable global-require */ /** Let's only load dependencies as needed */

if (config.enabled.optimize) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.cacheBusting) {
  const WebpackAssetsManifest = require('webpack-assets-manifest');

  webpackConfig.plugins.push(
    new WebpackAssetsManifest({
      output: 'assets.json',
      space: 2,
      writeToDisk: false,
      assets: config.manifest,
      replacer: require('./util/assetManifestsFormatter'),
    })
  );
}

module.exports = webpackConfig;
