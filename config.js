const path = require('path');
const { argv } = require('yargs');
const merge = require('webpack-merge');

const userConfig = require('./src/config.json');
const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = process.cwd();

const config = merge(
  {
    paths: {
      root: rootPath,
      src: path.join(rootPath, 'src'),
      dist: path.join(rootPath, 'dist'),
    },
    enabled: {
      sourceMaps: !isProduction,
    },
  },
  userConfig,
);

module.exports = merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
  publicPath: `${config.publicPath}/${path.basename(config.paths.dist)}/`,
});
