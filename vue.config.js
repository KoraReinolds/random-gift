module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/main.scss";`
      }
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('html-loader')
      .loader('html-loader');
  },
};
