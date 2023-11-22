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

// ../../packages/postcss/index.js
var require_postcss = __commonJS({
  "../../packages/postcss/index.js"(exports, module) {
    function replaceStr(str, prefix, replace) {
      const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, "g");
      return str.replace(reg, `$1${replace}`);
    }
    module.exports = (opts = {}) => {
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
  }
});

// ../config.js
var require_config = __commonJS({
  "../config.js"(exports, module) {
    module.exports = {
      target: "el-",
      replaceStr: "test-"
    };
  }
});

// vite.config.js
import { defineConfig } from "file:///E:/my-project/babel-setup-project/example/vite/node_modules/vite/dist/node/index.js";
import vue2 from "file:///E:/my-project/babel-setup-project/example/vite/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx2 from "file:///E:/my-project/babel-setup-project/example/vite/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// ../../packages/babel/esm/index.js
import * as babel from "@babel/core";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as types from "file:///E:/my-project/babel-setup-project/node_modules/@babel/types/lib/index.js";
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
var traverseDefault = traverse.default;
var generateDefault = generate.default;
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
      traverseDefault(result.ast, {
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
      const generatorCode = generateDefault(result.ast);
      return {
        code: generatorCode.code,
        map: result.map
      };
    }
  };
};
var esm_default = replaceVueNodes;

// postcss.config.js
var import_postcss = __toESM(require_postcss(), 1);
var postcss_config_default = {
  plugins: [
    // demo2(),
    (0, import_postcss.default)({
      target: "el-",
      result: "demo-"
    })
  ]
};

// vite.config.js
var config = __toESM(require_config(), 1);
var vite_config_default = defineConfig({
  plugins: [vue2(), vueJsx2(), esm_default(config)],
  css: {
    postcss: postcss_config_default
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFja2FnZXMvcG9zdGNzcy9pbmRleC5qcyIsICIuLi9jb25maWcuanMiLCAidml0ZS5jb25maWcuanMiLCAiLi4vLi4vcGFja2FnZXMvYmFiZWwvZXNtL2luZGV4LmpzIiwgInBvc3Rjc3MuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXHBhY2thZ2VzXFxcXHBvc3Rjc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxwYWNrYWdlc1xcXFxwb3N0Y3NzXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9teS1wcm9qZWN0L2JhYmVsLXNldHVwLXByb2plY3QvcGFja2FnZXMvcG9zdGNzcy9pbmRleC5qc1wiO2Z1bmN0aW9uIHJlcGxhY2VTdHIoc3RyLCBwcmVmaXgsIHJlcGxhY2UpIHtcclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCgoXnwoXFxcXHMpK3xcXFxcLnw9fFxcXFwtXFxcXC0pKSR7cHJlZml4fWAsICdnJyk7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnLCBgJDEke3JlcGxhY2V9YCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtpbXBvcnQoJ3Bvc3Rjc3MnKS5QbHVnaW5DcmVhdG9yfVxyXG4gICAqL1xyXG4gIG1vZHVsZS5leHBvcnRzID0gKG9wdHMgPSB7fSkgPT4ge1xyXG4gICAgLy8gV29yayB3aXRoIG9wdGlvbnMgaGVyZVxyXG4gIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcG9zdGNzc1BsdWdpbjogJ3Bvc3Rjc3MtcGx1Z2luLXJlcGxhY2UtY2xhc3Mtc3RyJyxcclxuICAgICAgLypcclxuICAgICAgUm9vdCAocm9vdCwgcG9zdGNzcykge1xyXG4gICAgICAgIC8vIFRyYW5zZm9ybSBDU1MgQVNUIGhlcmVcclxuICAgICAgfVxyXG4gICAgICAqL1xyXG4gICAgICAvLyBSb290KHJvb3QsIHBvc3Rjc3MpIHtcclxuICAgICAgLy8gfSxcclxuICAgICAgLypcclxuICAgICAgRGVjbGFyYXRpb24gKGRlY2wsIHBvc3Rjc3MpIHtcclxuICAgICAgICAvLyBUaGUgZmFzdGVyIHdheSB0byBmaW5kIERlY2xhcmF0aW9uIG5vZGVcclxuICAgICAgfVxyXG4gICAgICAqL1xyXG4gICAgICAvKlxyXG4gICAgICBEZWNsYXJhdGlvbjoge1xyXG4gICAgICAgIGNvbG9yOiAoZGVjbCwgcG9zdGNzcykge1xyXG4gICAgICAgICAgLy8gVGhlIGZhc3Rlc3Qgd2F5IGZpbmQgRGVjbGFyYXRpb24gbm9kZSBpZiB5b3Uga25vdyBwcm9wZXJ0eSBuYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgICovXHJcbiAgICAgIE9uY2Uocm9vdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGFyZ2V0LCByZXN1bHQgfSA9IG9wdHNcclxuICAgICAgICByb290LndhbGtSdWxlcyhydWxlID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0b3IgfSA9IHJ1bGVcclxuICAgICAgICAgIGlmICghc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2VsZWN0b3IuaW5jbHVkZXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBjb25zdCBydWxlQ2xvbmUgPSBydWxlLmNsb25lKClcclxuICAgICAgICAgICAgcnVsZUNsb25lLnNlbGVjdG9yID0gcmVwbGFjZVN0cihydWxlQ2xvbmUuc2VsZWN0b3IsIHRhcmdldCwgcmVzdWx0KVxyXG4gICAgICAgICAgICBydWxlLnJlcGxhY2VXaXRoKHJ1bGVDbG9uZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICAiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxleGFtcGxlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxteS1wcm9qZWN0XFxcXGJhYmVsLXNldHVwLXByb2plY3RcXFxcZXhhbXBsZVxcXFxjb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L215LXByb2plY3QvYmFiZWwtc2V0dXAtcHJvamVjdC9leGFtcGxlL2NvbmZpZy5qc1wiO21vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgdGFyZ2V0OiAnZWwtJyxcclxuICAgIHJlcGxhY2VTdHI6ICd0ZXN0LSdcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovbXktcHJvamVjdC9iYWJlbC1zZXR1cC1wcm9qZWN0L2V4YW1wbGUvdml0ZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xyXG5pbXBvcnQgYmFiZWxQbHVnaW5SZXBsYWNlQ2xzIGZyb20gXCIuLy4uLy4uL3BhY2thZ2VzL2JhYmVsL2VzbVwiO1xyXG5pbXBvcnQgcG9zdGNzcyBmcm9tICcuL3Bvc3Rjc3MuY29uZmlnJ1xyXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi8uLi9jb25maWcnXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCB2dWVKc3goKSwgYmFiZWxQbHVnaW5SZXBsYWNlQ2xzKGNvbmZpZyldLFxyXG4gIGNzczoge1xyXG4gICAgcG9zdGNzc1xyXG4gIH1cclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXHBhY2thZ2VzXFxcXGJhYmVsXFxcXGVzbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXHBhY2thZ2VzXFxcXGJhYmVsXFxcXGVzbVxcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovbXktcHJvamVjdC9iYWJlbC1zZXR1cC1wcm9qZWN0L3BhY2thZ2VzL2JhYmVsL2VzbS9pbmRleC5qc1wiO2ltcG9ydCAqIGFzIGJhYmVsIGZyb20gJ0BiYWJlbC9jb3JlJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJ0BiYWJlbC90eXBlcydcclxuaW1wb3J0IHRyYXZlcnNlIGZyb20gJ0BiYWJlbC90cmF2ZXJzZSdcclxuaW1wb3J0IGdlbmVyYXRlIGZyb20gXCJAYmFiZWwvZ2VuZXJhdG9yXCI7XHJcbmNvbnN0IHJlcGxhY2VTdHJGbiA9IChzdHIsIHByZWZpeCwgcmVwbGFjZSkgPT4ge1xyXG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChgKChefChcXFxccykrfFxcXFwufD18XFxcXC1cXFxcLSkpJHtwcmVmaXh9YCwgJ2cnKTtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZShyZWcsIGAkMSR7cmVwbGFjZX1gKTtcclxufVxyXG5jb25zdCB2YWlsZGF0ZVJlcGxhY2VTdHIgPSAoc3RyLCBwcmVmaXgpID0+IHtcclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCgoXnwoXFxcXHMpK3xcXFxcLnw9fFxcXFwtXFxcXC0pKSR7cHJlZml4fWAsICdnJyk7XHJcbiAgICByZXR1cm4gcmVnLnRlc3Qoc3RyKVxyXG59XHJcblxyXG5jb25zdCB0cmF2ZXJzZURlZmF1bHQgPSB0cmF2ZXJzZS5kZWZhdWx0XHJcbmNvbnN0IGdlbmVyYXRlRGVmYXVsdCA9IGdlbmVyYXRlLmRlZmF1bHRcclxuY29uc3QgcmVwbGFjZVZ1ZU5vZGVzID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAncmVwbGFjZS12dWUtbm9kZXMnLFxyXG4gICAgICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCwgb3B0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbnMgPSBbXVxyXG4gICAgICAgICAgICBpZiAoaWQuZW5kc1dpdGgoJ2NzcycpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAoIWlkLmVuZHNXaXRoKCcudnVlJykgJiYgIWlkLmVuZHNXaXRoKCcuanN4JykgJiYgIWlkLmVuZHNXaXRoKCcudHN4JykgJiYgIWlkLmVuZHNXaXRoKCcudHMnKSAmJiAhaWQuZW5kc1dpdGgoJy5qcycpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm5cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBwbHVnaW5zLnB1c2godnVlLCB2dWVKc3gpXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhYmVsLnRyYW5zZm9ybVN5bmMoY29kZSwge1xyXG4gICAgICAgICAgICAgICAgYmFiZWxyYzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiBbXSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZUZpbGVOYW1lOiBpZCxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ0ZpbGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdHJhdmVyc2VEZWZhdWx0KHJlc3VsdC5hc3QsIHtcclxuICAgICAgICAgICAgICAgIFN0cmluZ0xpdGVyYWwocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0LCByZXBsYWNlU3RyIH0gPSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhaWxkYXRlUmVwbGFjZVN0cihwYXRoLm5vZGUudmFsdWUsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGgucGFyZW50Py5rZXk/Lm5hbWUgPT09ICdjbGFzcycgfHwgcGF0aC5wYXJlbnQ/LmtleT8udmFsdWUgPT09ICdjbGFzcycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld05vZGUgPSB0eXBlcy5TdHJpbmdMaXRlcmFsKHJlcGxhY2VTdHJGbihwYXRoLm5vZGUudmFsdWUsIHRhcmdldCwgcmVwbGFjZVN0cikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5yZXBsYWNlV2l0aChuZXdOb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdG9yQ29kZSA9IGdlbmVyYXRlRGVmYXVsdChyZXN1bHQuYXN0KVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY29kZTogZ2VuZXJhdG9yQ29kZS5jb2RlLFxyXG4gICAgICAgICAgICAgICAgbWFwOiByZXN1bHQubWFwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlVnVlTm9kZXMiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxleGFtcGxlXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxleGFtcGxlXFxcXHZpdGVcXFxccG9zdGNzcy5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L215LXByb2plY3QvYmFiZWwtc2V0dXAtcHJvamVjdC9leGFtcGxlL3ZpdGUvcG9zdGNzcy5jb25maWcuanNcIjtpbXBvcnQgcmVwbGFjZUNscyBmcm9tICcuLy4uLy4uL3BhY2thZ2VzL3Bvc3Rjc3MnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgLy8gZGVtbzIoKSxcclxuICAgICAgICByZXBsYWNlQ2xzKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnZWwtJyxcclxuICAgICAgICAg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QkFBSyxZQUFZLE9BQU87QUFBQSxZQUM1QjtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQUEsTUFDSixDQUFDO0FBQ0QsWUFBTSxnQkFBZ0IsZ0JBQWdCLE9BQU8sR0FBRztBQUNoRCxhQUFPO0FBQUEsUUFDSCxNQUFNLGNBQWM7QUFBQSxRQUNwQixLQUFLLE9BQU87QUFBQSxNQUNoQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0o7QUFDQSxJQUFPLGNBQVE7OztBQ3hENlQscUJBQXVCO0FBRW5XLElBQU8seUJBQVE7QUFBQSxFQUNYLFNBQVM7QUFBQTtBQUFBLFFBRUwsZUFBQUMsU0FBVztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0w7QUFDSjs7O0FGTEEsYUFBd0I7QUFFeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDQyxLQUFJLEdBQUdDLFFBQU8sR0FBRyxZQUFzQixNQUFNLENBQUM7QUFBQSxFQUN4RCxLQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJ2dWUiLCAidnVlSnN4IiwgInJlcGxhY2VDbHMiLCAidnVlIiwgInZ1ZUpzeCJdCn0K
