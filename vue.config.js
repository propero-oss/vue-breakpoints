module.exports = {
  configureWebpack: {
    externals: {
      "vue": "Vue",
      "vue-class-component": "vueClassComponent",
      "vue-property-decorator": "vuePropertyDecorator",
      "@rocketbase/vue-extra-decorators": "vueExtraDecorators"
    }
  }
};
