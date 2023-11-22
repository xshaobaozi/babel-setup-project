var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../packages/postcss/plugins/replace-class-str/index.js
var require_replace_class_str = __commonJS({
  "../../packages/postcss/plugins/replace-class-str/index.js"(exports, module) {
    module.exports = (opts = {}) => {
      function replaceStr(str, prefix, replace) {
        const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, "g");
        return str.replace(reg, `$1${replace}`);
      }
      return {
        postcssPlugin: "postcss-plugin-replace-class-str",
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
          const { target, result } = opts;
          root.walkRules((rule) => {
            const { selector } = rule;
            if (!selector) {
              return;
            }
            if (selector.includes(target)) {
              const ruleClone = rule.clone();
              ruleClone.selector = replaceStr(ruleClone.selector, target, result);
              rule.replaceWith(ruleClone);
            }
          });
        }
      };
    };
    module.exports.postcss = true;
  }
});

// vite.config.js
import { defineConfig } from "file:///E:/my-project/babel-setup-project/example/vite/node_modules/vite/dist/node/index.js";
import vue2 from "file:///E:/my-project/babel-setup-project/example/vite/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// ../../packages/babel/replaceNodes/index.mjs
import * as babel from "@babel/core";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as types from "@babel/types";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
var replaceStrFn = (str, prefix, replace) => {
  const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, "g");
  return str.replace(reg, `$1${replace}`);
};
var vaildateReplaceStr = (str, prefix) => {
  const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, "g");
  return reg.test(str);
};
var replaceVueNodes = function(options = {}) {
  return {
    name: "replace-vue-nodes",
    async transform(code, id, opt) {
      const plugins = [];
      if (id.endsWith("css")) {
        return;
      }
      plugins.push(vue, vueJsx);
      const result = babel.transformSync(code, {
        babelrc: false,
        ast: true,
        plugins: [],
        sourceFileName: id,
        configFile: false
      });
      traverse(result.ast, {
        StringLiteral(path) {
          const { target, replaceStr } = options;
          if (vaildateReplaceStr(path.node.value, target)) {
            if (path.parent?.key?.name === "class" || path.parent?.key?.value === "class") {
              const newNode = types.StringLiteral(replaceStrFn(path.node.value, target, replaceStr));
              path.replaceWith(newNode);
            }
          }
        }
      });
      const generatorCode = generate(result.ast);
      return {
        code: generatorCode.code,
        map: result.map
      };
    }
  };
};
var replaceNodes_default = replaceVueNodes;

// postcss.config.js
var import_replace_class_str = __toESM(require_replace_class_str(), 1);
var postcss_config_default = {
  plugins: [
    // demo2(),
    (0, import_replace_class_str.default)({
      target: "el-",
      result: "demo-"
    })
  ]
};

// vite.config.js
console.log("babelPluginReplaceCls", replaceNodes_default);
var vite_config_default = defineConfig({
  plugins: [vue2()],
  css: {
    postcss: postcss_config_default
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFja2FnZXMvcG9zdGNzcy9wbHVnaW5zL3JlcGxhY2UtY2xhc3Mtc3RyL2luZGV4LmpzIiwgInZpdGUuY29uZmlnLmpzIiwgIi4uLy4uL3BhY2thZ2VzL2JhYmVsL3JlcGxhY2VOb2Rlcy9pbmRleC5tanMiLCAicG9zdGNzcy5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxteS1wcm9qZWN0XFxcXGJhYmVsLXNldHVwLXByb2plY3RcXFxccGFja2FnZXNcXFxccG9zdGNzc1xcXFxwbHVnaW5zXFxcXHJlcGxhY2UtY2xhc3Mtc3RyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxteS1wcm9qZWN0XFxcXGJhYmVsLXNldHVwLXByb2plY3RcXFxccGFja2FnZXNcXFxccG9zdGNzc1xcXFxwbHVnaW5zXFxcXHJlcGxhY2UtY2xhc3Mtc3RyXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9teS1wcm9qZWN0L2JhYmVsLXNldHVwLXByb2plY3QvcGFja2FnZXMvcG9zdGNzcy9wbHVnaW5zL3JlcGxhY2UtY2xhc3Mtc3RyL2luZGV4LmpzXCI7LyoqXG4gKiBAdHlwZSB7aW1wb3J0KCdwb3N0Y3NzJykuUGx1Z2luQ3JlYXRvcn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAob3B0cyA9IHt9KSA9PiB7XG4gIC8vIFdvcmsgd2l0aCBvcHRpb25zIGhlcmVcbiAgZnVuY3Rpb24gcmVwbGFjZVN0cihzdHIsIHByZWZpeCwgcmVwbGFjZSkge1xuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCgoXnwoXFxcXHMpK3xcXFxcLnw9fFxcXFwtXFxcXC0pKSR7cHJlZml4fWAsICdnJyk7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZywgYCQxJHtyZXBsYWNlfWApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwb3N0Y3NzUGx1Z2luOiAncG9zdGNzcy1wbHVnaW4tcmVwbGFjZS1jbGFzcy1zdHInLFxuICAgIC8qXG4gICAgUm9vdCAocm9vdCwgcG9zdGNzcykge1xuICAgICAgLy8gVHJhbnNmb3JtIENTUyBBU1QgaGVyZVxuICAgIH1cbiAgICAqL1xuICAgIC8vIFJvb3Qocm9vdCwgcG9zdGNzcykge1xuICAgIC8vIH0sXG4gICAgLypcbiAgICBEZWNsYXJhdGlvbiAoZGVjbCwgcG9zdGNzcykge1xuICAgICAgLy8gVGhlIGZhc3RlciB3YXkgdG8gZmluZCBEZWNsYXJhdGlvbiBub2RlXG4gICAgfVxuICAgICovXG4gICAgLypcbiAgICBEZWNsYXJhdGlvbjoge1xuICAgICAgY29sb3I6IChkZWNsLCBwb3N0Y3NzKSB7XG4gICAgICAgIC8vIFRoZSBmYXN0ZXN0IHdheSBmaW5kIERlY2xhcmF0aW9uIG5vZGUgaWYgeW91IGtub3cgcHJvcGVydHkgbmFtZVxuICAgICAgfVxuICAgIH1cbiAgICAqL1xuICAgIE9uY2Uocm9vdCkge1xuICAgICAgY29uc3QgeyB0YXJnZXQsIHJlc3VsdCB9ID0gb3B0c1xuICAgICAgcm9vdC53YWxrUnVsZXMocnVsZSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0b3IgfSA9IHJ1bGVcbiAgICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3Rvci5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICAgICAgY29uc3QgcnVsZUNsb25lID0gcnVsZS5jbG9uZSgpXG4gICAgICAgICAgcnVsZUNsb25lLnNlbGVjdG9yID0gcmVwbGFjZVN0cihydWxlQ2xvbmUuc2VsZWN0b3IsIHRhcmdldCwgcmVzdWx0KVxuICAgICAgICAgIHJ1bGUucmVwbGFjZVdpdGgocnVsZUNsb25lKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMucG9zdGNzcyA9IHRydWVcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovbXktcHJvamVjdC9iYWJlbC1zZXR1cC1wcm9qZWN0L2V4YW1wbGUvdml0ZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgYmFiZWxQbHVnaW5SZXBsYWNlQ2xzIGZyb20gXCIuLy4uLy4uL3BhY2thZ2VzL2JhYmVsL3JlcGxhY2VOb2Rlcy9pbmRleC5tanNcIjtcclxuY29uc29sZS5sb2coJ2JhYmVsUGx1Z2luUmVwbGFjZUNscycsIGJhYmVsUGx1Z2luUmVwbGFjZUNscylcclxuaW1wb3J0IHBvc3Rjc3MgZnJvbSAnLi9wb3N0Y3NzLmNvbmZpZydcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbdnVlKCldLFxyXG4gIGNzczoge1xyXG4gICAgcG9zdGNzc1xyXG4gIH1cclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXHBhY2thZ2VzXFxcXGJhYmVsXFxcXHJlcGxhY2VOb2Rlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXHBhY2thZ2VzXFxcXGJhYmVsXFxcXHJlcGxhY2VOb2Rlc1xcXFxpbmRleC5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L215LXByb2plY3QvYmFiZWwtc2V0dXAtcHJvamVjdC9wYWNrYWdlcy9iYWJlbC9yZXBsYWNlTm9kZXMvaW5kZXgubWpzXCI7aW1wb3J0ICogYXMgYmFiZWwgZnJvbSAnQGJhYmVsL2NvcmUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnQGJhYmVsL3R5cGVzJ1xyXG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAnQGJhYmVsL3RyYXZlcnNlJ1xyXG5pbXBvcnQgZ2VuZXJhdGUgZnJvbSBcIkBiYWJlbC9nZW5lcmF0b3JcIjtcclxuY29uc3QgcmVwbGFjZVN0ckZuID0gKHN0ciwgcHJlZml4LCByZXBsYWNlKSA9PiB7XHJcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKGAoKF58KFxcXFxzKSt8XFxcXC58PXxcXFxcLVxcXFwtKSkke3ByZWZpeH1gLCAnZycpO1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZywgYCQxJHtyZXBsYWNlfWApO1xyXG59XHJcbmNvbnN0IHZhaWxkYXRlUmVwbGFjZVN0ciA9IChzdHIsIHByZWZpeCkgPT4ge1xyXG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChgKChefChcXFxccykrfFxcXFwufD18XFxcXC1cXFxcLSkpJHtwcmVmaXh9YCwgJ2cnKTtcclxuICAgIHJldHVybiByZWcudGVzdChzdHIpXHJcbn1cclxuY29uc3QgcmVwbGFjZVZ1ZU5vZGVzID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAncmVwbGFjZS12dWUtbm9kZXMnLFxyXG4gICAgICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCwgb3B0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbnMgPSBbXVxyXG4gICAgICAgICAgICBpZiAoaWQuZW5kc1dpdGgoJ2NzcycpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKCFpZC5lbmRzV2l0aCgnLnZ1ZScpICYmICFpZC5lbmRzV2l0aCgnLmpzeCcpICYmICFpZC5lbmRzV2l0aCgnLnRzeCcpICYmICFpZC5lbmRzV2l0aCgnLnRzJykgJiYgIWlkLmVuZHNXaXRoKCcuanMnKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgcGx1Z2lucy5wdXNoKHZ1ZSwgdnVlSnN4KVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBiYWJlbC50cmFuc2Zvcm1TeW5jKGNvZGUsIHtcclxuICAgICAgICAgICAgICAgIGJhYmVscmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGx1Z2luczogW10sXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VGaWxlTmFtZTogaWQsXHJcbiAgICAgICAgICAgICAgICBjb25maWdGaWxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRyYXZlcnNlKHJlc3VsdC5hc3QsIHtcclxuICAgICAgICAgICAgICAgIFN0cmluZ0xpdGVyYWwocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0LCByZXBsYWNlU3RyIH0gPSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhaWxkYXRlUmVwbGFjZVN0cihwYXRoLm5vZGUudmFsdWUsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGgucGFyZW50Py5rZXk/Lm5hbWUgPT09ICdjbGFzcycgfHwgcGF0aC5wYXJlbnQ/LmtleT8udmFsdWUgPT09ICdjbGFzcycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld05vZGUgPSB0eXBlcy5TdHJpbmdMaXRlcmFsKHJlcGxhY2VTdHJGbihwYXRoLm5vZGUudmFsdWUsIHRhcmdldCwgcmVwbGFjZVN0cikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5yZXBsYWNlV2l0aChuZXdOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdG9yQ29kZSA9IGdlbmVyYXRlKHJlc3VsdC5hc3QpXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBnZW5lcmF0b3JDb2RlLmNvZGUsXHJcbiAgICAgICAgICAgICAgICBtYXA6IHJlc3VsdC5tYXBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VWdWVOb2RlcyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVxcXFxwb3N0Y3NzLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovbXktcHJvamVjdC9iYWJlbC1zZXR1cC1wcm9qZWN0L2V4YW1wbGUvdml0ZS9wb3N0Y3NzLmNvbmZpZy5qc1wiO2ltcG9ydCByZXBsYWNlQ2xzIGZyb20gJy4vLi4vLi4vcGFja2FnZXMvcG9zdGNzcy9wbHVnaW5zL3JlcGxhY2UtY2xhc3Mtc3RyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIC8vIGRlbW8yKCksXHJcbiAgICAgICAgcmVwbGFjZUNscyh7XHJcbiAgICAgICAgICAgIHRhcmdldDogJ2VsLScsXHJcbiAgICAgICAgICAgIHJlc3VsdDogJ2RlbW8tJ1xyXG4gICAgICAgIH0pXHJcbiAgICBdXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBR0EsV0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU07QUFFOUIsZUFBUyxXQUFXLEtBQUssUUFBUSxTQUFTO0FBQ3hDLGNBQU0sTUFBTSxJQUFJLE9BQU8sNEJBQTRCLE1BQU0sSUFBSSxHQUFHO0FBQ2hFLGVBQU8sSUFBSSxRQUFRLEtBQUssS0FBSyxPQUFPLEVBQUU7QUFBQSxNQUN4QztBQUVBLGFBQU87QUFBQSxRQUNMLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBb0JmLEtBQUssTUFBTTtBQUNULGdCQUFNLEVBQUUsUUFBUSxPQUFPLElBQUk7QUFDM0IsZUFBSyxVQUFVLFVBQVE7QUFDckIsa0JBQU0sRUFBRSxTQUFTLElBQUk7QUFDckIsZ0JBQUksQ0FBQyxVQUFVO0FBQ2I7QUFBQSxZQUNGO0FBQ0Es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
