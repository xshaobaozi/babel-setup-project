function replaceStr(str, prefix, replace) {
    const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, 'g');
    return str.replace(reg, `$1${replace}`);
  }
  /**
   * @type {import('postcss').PluginCreator}
   */
  module.exports = (opts = {}) => {
    // Work with options here
  
    return {
      postcssPlugin: 'postcss-plugin-replace-class-str',
      /*
      Root (root, postcss) {
        // Transform CSS AST here
      }
      */
      // Root(root, postcss) {
      // },
      /*
      Declaration (decl, postcss) {
        // The faster way to find Declaration node
      }
      */
      /*
      Declaration: {
        color: (decl, postcss) {
          // The fastest way find Declaration node if you know property name
        }
      }
      */
      Once(root) {
        const { target, result } = opts
        root.walkRules(rule => {
          const { selector } = rule
          if (!selector) {
            return
          }
          if (selector.includes(target)) {
            const ruleClone = rule.clone()
            ruleClone.selector = replaceStr(ruleClone.selector, target, result)
            rule.replaceWith(ruleClone);
          }
        })
      }
    }
  }
  