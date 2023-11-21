import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import babelPluginReplaceCls from "./../../packages/babel/replaceNodes/index.mjs";
import postcss from './postcss.config'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), babelPluginReplaceCls({
    target: 'el-',
    replaceStr: 'test-'
  })],
  css: {
    postcss
  }
});
