/* eslint-disable react-hooks/rules-of-hooks */
const { alias, configPaths } = require('react-app-rewire-alias');
const { override, useBabelRc, addWebpackPlugin, addWebpackExternals } = require('customize-cra');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = override(
  useBabelRc(),
  alias(configPaths('./tsconfig.paths.json')),
  addWebpackPlugin(new LoadablePlugin()),
  addWebpackPlugin(
    new BundleAnalyzerPlugin({
      analyzerMode: isDevelopment ? 'server' : 'static',
      openAnalyzer: true,
    }),
  ),

  !isDevelopment &&
    (addWebpackPlugin(new LoaderOptionsPlugin({ minimize: true })),
    addWebpackExternals({
      'lottie-web': 'lottie',
    })),
);
