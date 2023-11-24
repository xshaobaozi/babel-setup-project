const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `@use "@/styles/ele-vairble.scss" as *;`,
      },
    },
  },
})
