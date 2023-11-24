const replaceVueNodes = require('./../../packages/babel/commonjs');
const params = require('./../config')
const path = require('path')
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
      replaceVueNodes(params.babelConfig)
  ],
  include: [
    './src/**/*',
    path.resolve('node_modules/element-ui')
  ]
};
