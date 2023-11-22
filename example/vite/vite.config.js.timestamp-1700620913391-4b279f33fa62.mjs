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
var import_config = __toESM(require_config(), 1);
var vite_config_default = defineConfig({
  plugins: [vue2(), vueJsx2(), esm_default(import_config.default)],
  css: {
    postcss: postcss_config_default
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFja2FnZXMvcG9zdGNzcy9pbmRleC5qcyIsICIuLi9jb25maWcuanMiLCAidml0ZS5jb25maWcuanMiLCAiLi4vLi4vcGFja2FnZXMvYmFiZWwvZXNtL2luZGV4LmpzIiwgInBvc3Rjc3MuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXHBhY2thZ2VzXFxcXHBvc3Rjc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxwYWNrYWdlc1xcXFxwb3N0Y3NzXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9teS1wcm9qZWN0L2JhYmVsLXNldHVwLXByb2plY3QvcGFja2FnZXMvcG9zdGNzcy9pbmRleC5qc1wiO2Z1bmN0aW9uIHJlcGxhY2VTdHIoc3RyLCBwcmVmaXgsIHJlcGxhY2UpIHtcclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCgoXnwoXFxcXHMpK3xcXFxcLnw9fFxcXFwtXFxcXC0pKSR7cHJlZml4fWAsICdnJyk7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnLCBgJDEke3JlcGxhY2V9YCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtpbXBvcnQoJ3Bvc3Rjc3MnKS5QbHVnaW5DcmVhdG9yfVxyXG4gICAqL1xyXG4gIG1vZHVsZS5leHBvcnRzID0gKG9wdHMgPSB7fSkgPT4ge1xyXG4gICAgLy8gV29yayB3aXRoIG9wdGlvbnMgaGVyZVxyXG4gIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcG9zdGNzc1BsdWdpbjogJ3Bvc3Rjc3MtcGx1Z2luLXJlcGxhY2UtY2xhc3Mtc3RyJyxcclxuICAgICAgLypcclxuICAgICAgUm9vdCAocm9vdCwgcG9zdGNzcykge1xyXG4gICAgICAgIC8vIFRyYW5zZm9ybSBDU1MgQVNUIGhlcmVcclxuICAgICAgfVxyXG4gICAgICAqL1xyXG4gICAgICAvLyBSb290KHJvb3QsIHBvc3Rjc3MpIHtcclxuICAgICAgLy8gfSxcclxuICAgICAgLypcclxuICAgICAgRGVjbGFyYXRpb24gKGRlY2wsIHBvc3Rjc3MpIHtcclxuICAgICAgICAvLyBUaGUgZmFzdGVyIHdheSB0byBmaW5kIERlY2xhcmF0aW9uIG5vZGVcclxuICAgICAgfVxyXG4gICAgICAqL1xyXG4gICAgICAvKlxyXG4gICAgICBEZWNsYXJhdGlvbjoge1xyXG4gICAgICAgIGNvbG9yOiAoZGVjbCwgcG9zdGNzcykge1xyXG4gICAgICAgICAgLy8gVGhlIGZhc3Rlc3Qgd2F5IGZpbmQgRGVjbGFyYXRpb24gbm9kZSBpZiB5b3Uga25vdyBwcm9wZXJ0eSBuYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgICovXHJcbiAgICAgIE9uY2Uocm9vdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGFyZ2V0LCByZXN1bHQgfSA9IG9wdHNcclxuICAgICAgICByb290LndhbGtSdWxlcyhydWxlID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0b3IgfSA9IHJ1bGVcclxuICAgICAgICAgIGlmICghc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2VsZWN0b3IuaW5jbHVkZXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBjb25zdCBydWxlQ2xvbmUgPSBydWxlLmNsb25lKClcclxuICAgICAgICAgICAgcnVsZUNsb25lLnNlbGVjdG9yID0gcmVwbGFjZVN0cihydWxlQ2xvbmUuc2VsZWN0b3IsIHRhcmdldCwgcmVzdWx0KVxyXG4gICAgICAgICAgICBydWxlLnJlcGxhY2VXaXRoKHJ1bGVDbG9uZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICAiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxleGFtcGxlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxteS1wcm9qZWN0XFxcXGJhYmVsLXNldHVwLXByb2plY3RcXFxcZXhhbXBsZVxcXFxjb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L215LXByb2plY3QvYmFiZWwtc2V0dXAtcHJvamVjdC9leGFtcGxlL2NvbmZpZy5qc1wiO21vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgdGFyZ2V0OiAnZWwtJyxcclxuICAgIHJlcGxhY2VTdHI6ICd0ZXN0LSdcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbXktcHJvamVjdFxcXFxiYWJlbC1zZXR1cC1wcm9qZWN0XFxcXGV4YW1wbGVcXFxcdml0ZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovbXktcHJvamVjdC9iYWJlbC1zZXR1cC1wcm9qZWN0L2V4YW1wbGUvdml0ZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xyXG5pbXBvcnQgYmFiZWxQbHVnaW5SZXBsYWNlQ2xzIGZyb20gXCIuLy4uLy4uL3BhY2thZ2VzL2JhYmVsL2VzbVwiO1xyXG5pbXBvcnQgcG9zdGNzcyBmcm9tICcuL3Bvc3Rjc3MuY29uZmlnJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vLi4vY29uZmlnJ1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFt2dWUoKSwgdnVlSnN4KCksIGJhYmVsUGx1Z2luUmVwbGFjZUNscyhjb25maWcpXSxcclxuICBjc3M6IHtcclxuICAgIHBvc3Rjc3NcclxuICB9XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxwYWNrYWdlc1xcXFxiYWJlbFxcXFxlc21cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXG15LXByb2plY3RcXFxcYmFiZWwtc2V0dXAtcHJvamVjdFxcXFxwYWNrYWdlc1xcXFxiYWJlbFxcXFxlc21cXFxcaW5kZXguanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L215LXByb2plY3QvYmFiZWwtc2V0dXAtcHJvamVjdC9wYWNrYWdlcy9iYWJlbC9lc20vaW5kZXguanNcIjtpbXBvcnQgKiBhcyBiYWJlbCBmcm9tICdAYmFiZWwvY29yZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICdAYmFiZWwvdHlwZXMnXHJcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICdAYmFiZWwvdHJhdmVyc2UnXHJcbmltcG9ydCBnZW5lcmF0ZSBmcm9tIFwiQGJhYmVsL2dlbmVyYXRvclwiO1xyXG5jb25zdCByZXBsYWNlU3RyRm4gPSAoc3RyLCBwcmVmaXgsIHJlcGxhY2UpID0+IHtcclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCgoXnwoXFxcXHMpK3xcXFxcLnw9fFxcXFwtXFxcXC0pKSR7cHJlZml4fWAsICdnJyk7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnLCBgJDEke3JlcGxhY2V9YCk7XHJcbn1cclxuY29uc3QgdmFpbGRhdGVSZXBsYWNlU3RyID0gKHN0ciwgcHJlZml4KSA9PiB7XHJcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKGAoKF58KFxcXFxzKSt8XFxcXC58PXxcXFxcLVxcXFwtKSkke3ByZWZpeH1gLCAnZycpO1xyXG4gICAgcmV0dXJuIHJlZy50ZXN0KHN0cilcclxufVxyXG5cclxuY29uc3QgdHJhdmVyc2VEZWZhdWx0ID0gdHJhdmVyc2UuZGVmYXVsdFxyXG5jb25zdCBnZW5lcmF0ZURlZmF1bHQgPSBnZW5lcmF0ZS5kZWZhdWx0XHJcbmNvbnN0IHJlcGxhY2VWdWVOb2RlcyA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ3JlcGxhY2UtdnVlLW5vZGVzJyxcclxuICAgICAgICBhc3luYyB0cmFuc2Zvcm0oY29kZSwgaWQsIG9wdCkge1xyXG4gICAgICAgICAgICBjb25zdCBwbHVnaW5zID0gW11cclxuICAgICAgICAgICAgaWYgKGlkLmVuZHNXaXRoKCdjc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKCFpZC5lbmRzV2l0aCgnLnZ1ZScpICYmICFpZC5lbmRzV2l0aCgnLmpzeCcpICYmICFpZC5lbmRzV2l0aCgnLnRzeCcpICYmICFpZC5lbmRzV2l0aCgnLnRzJykgJiYgIWlkLmVuZHNXaXRoKCcuanMnKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgcGx1Z2lucy5wdXNoKHZ1ZSwgdnVlSnN4KVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBiYWJlbC50cmFuc2Zvcm1TeW5jKGNvZGUsIHtcclxuICAgICAgICAgICAgICAgIGJhYmVscmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGx1Z2luczogW10sXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VGaWxlTmFtZTogaWQsXHJcbiAgICAgICAgICAgICAgICBjb25maWdGaWxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRyYXZlcnNlRGVmYXVsdChyZXN1bHQuYXN0LCB7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdMaXRlcmFsKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHRhcmdldCwgcmVwbGFjZVN0ciB9ID0gb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWlsZGF0ZVJlcGxhY2VTdHIocGF0aC5ub2RlLnZhbHVlLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXRoLnBhcmVudD8ua2V5Py5uYW1lID09PSAnY2xhc3MnIHx8IHBhdGgucGFyZW50Py5rZXk/LnZhbHVlID09PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdOb2RlID0gdHlwZXMuU3RyaW5nTGl0ZXJhbChyZXBsYWNlU3RyRm4ocGF0aC5ub2RlLnZhbHVlLCB0YXJnZXQsIHJlcGxhY2VTdHIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGgucmVwbGFjZVdpdGgobmV3Tm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRvckNvZGUgPSBnZW5lcmF0ZURlZmF1bHQocmVzdWx0LmFzdClcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IGdlbmVyYXRvckNvZGUuY29kZSxcclxuICAgICAgICAgICAgICAgIG1hcDogcmVzdWx0Lm1hcFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZVZ1ZU5vZGVzIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxteS1wcm9qZWN0XFxcXGJhYmVsLXNldHVwLXByb2plY3RcXFxcZXhhbXBsZVxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxteS1wcm9qZWN0XFxcXGJhYmVsLXNldHVwLXByb2plY3RcXFxcZXhhbXBsZVxcXFx2aXRlXFxcXHBvc3Rjc3MuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9teS1wcm9qZWN0L2JhYmVsLXNldHVwLXByb2plY3QvZXhhbXBsZS92aXRlL3Bvc3Rjc3MuY29uZmlnLmpzXCI7aW1wb3J0IHJlcGxhY2VDbHMgZnJvbSAnLi8uLi8uLi9wYWNrYWdlcy9wb3N0Y3NzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIC8vIGRlbW8yKCksXHJcbiAgICAgICAgcmVwbGFjZUNscyh7XHJcbiAgICAgICAgICAgIHRhcmdldDogJ2VsLScsXHJcbiAgICAgICAgICAgIHJl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WUFBWSxPQUFPO0FBQUEsWUFDNUI7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUNELFlBQU0sZ0JBQWdCLGdCQUFnQixPQUFPLEdBQUc7QUFDaEQsYUFBTztBQUFBLFFBQ0gsTUFBTSxjQUFjO0FBQUEsUUFDcEIsS0FBSyxPQUFPO0FBQUEsTUFDaEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKO0FBQ0EsSUFBTyxjQUFROzs7QUN4RDZULHFCQUF1QjtBQUVuVyxJQUFPLHlCQUFRO0FBQUEsRUFDWCxTQUFTO0FBQUE7QUFBQSxRQUVMLGVBQUFDLFNBQVc7QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNMO0FBQ0o7OztBRkxBLG9CQUFtQjtBQUVuQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUNDLEtBQUksR0FBR0MsUUFBTyxHQUFHLFlBQXNCLGNBQUFDLE9BQU0sQ0FBQztBQUFBLEVBQ3hELEtBQUs7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInZ1ZSIsICJ2dWVKc3giLCAicmVwbGFjZUNscyIsICJ2dWUiLCAidnVlSnN4IiwgImNvbmZpZyJdCn0K
