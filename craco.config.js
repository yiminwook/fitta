const CracoAlias = require('craco-alias');
const LoadablePlugin = require('@loadable/webpack-plugin');

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
      add: [new LoadablePlugin()],
    },
  },
  babel: {
    plugins: ['@loadable/babel-plugin'],
  },
};
