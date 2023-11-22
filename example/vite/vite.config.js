import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import babelPluginReplaceCls from "./../../packages/babel/esm";
import postcss from './postcss.config'
import * as config from './../config'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), babelPluginReplaceCls(config.default)],
  css: {
    postcss
  }
});
