const replaceCls = require('./../../packages/cmd');

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [replaceCls()]
};
