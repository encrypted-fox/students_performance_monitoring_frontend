module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-persist'
  ],
  configureWebpack: config => {
    config.resolve.extensions = ['.vue', '.js', '.ts']
  },
    devServer: {
      overlay: {
      warnings: false,
      errors: true,
      },
      disableHostCheck: true,
      public: 'encrypted-fox.ru'
    }
}
