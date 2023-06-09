const CracoAlias = require('craco-alias');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new LoadablePlugin(),
        new BundleAnalyzerPlugin({
          analyzerMode: isDevelopment ? 'server' : 'static',
          openAnalyzer: true,
        }),
      ],
    },
  },
  babel: {
    plugins: ['@loadable/babel-plugin'],
  },
};

if (!isDevelopment && config.webpack.plugins.add) {
  config.webpack.plugins.add.push(new LoaderOptionsPlugin({ minimize: true }));
}

module.exports = config;
