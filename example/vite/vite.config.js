import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import babelPluginReplaceCls from "./../../packages/esm";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), babelPluginReplaceCls()],
});
