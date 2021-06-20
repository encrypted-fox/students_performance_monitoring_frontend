module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-persist'
  ],
  configureWebpack: config => {
    config.resolve.extensions = ['.vue', '.js', '.ts']
  }
}
