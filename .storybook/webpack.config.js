const path = require('path');
const sassConfig = require('../sass-loader.config');

module.exports = ({ config }) => {
  const rule = config.module.rules[0];
  const ruleUse = rule.use[0];
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  // @see https://github.com/gatsbyjs/gatsby/issues/10668#issuecomment-572384292
  // rule.exclude = [/node_modules\/(?!(gatsby)\/)/];

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  ruleUse.loader = require.resolve('babel-loader');

  // use @babel/preset-react for JSX and env (instead of staged presets)
  ruleUse.options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ];

  ruleUse.options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),
    // use babel-plugin-remove-graphql-queries to remove static queries from
    // components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries'),
  ];

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  // eslint-disable-next-line no-param-reassign
  config.resolve.mainFields = ['browser', 'module', 'main'];

  // Adds SCSS parsing
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        ...sassConfig,
      },
    }],
    include: path.resolve(__dirname, '../'),
  }, {
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });

  return config;
};
