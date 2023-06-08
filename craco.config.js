const CracoAlias = require('craco-alias');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
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
          openAnalyzer: isDevelopment ? true : false,
        }),
      ],
    },
  },
  babel: {
    plugins: ['@loadable/babel-plugin'],
  },
};
