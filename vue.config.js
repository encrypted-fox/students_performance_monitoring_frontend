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
     	 errors: false,
      },
      disableHostCheck: true,
      public: 'encrypted-fox.ru',
      https: false,
      hot: false
    }
}
