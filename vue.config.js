module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = "Unsplash Photo Search";
        return args;
      }),
      config.module.rule('eslint').use('eslint-loader').options({
        fix: true
      })
    },
  };
