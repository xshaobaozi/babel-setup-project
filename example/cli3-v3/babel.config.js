const replaceVueNodes = require('./../../packages/babel/commonjs');
const params = require('./../config')
debugger
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
      replaceVueNodes(params)
  ]
};
