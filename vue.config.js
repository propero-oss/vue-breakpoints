module.exports = {
  configureWebpack: {
    externals: {
      "vue": "Vue",
      "vue-class-component": "vueClassComponent",
      "vue-property-decorator": "vuePropertyDecorator",
      "@propero/vue-extra-decorators": "vueExtraDecorators"
    }
  }
};
