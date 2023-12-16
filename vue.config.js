const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // Add the html-loader for processing HTML files
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('html-loader')
      .loader('html-loader')
      .end();
      // Define the environment variable
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['BE_APP_BASE_URL'] = JSON.stringify(process.env.BE_APP_BASE_URL);
      return definitions;
    });
  },
})
