import sourcemaps from "rollup-plugin-sourcemaps";
import commonjs from "rollup-plugin-commonjs";
import ts from "@wessberg/rollup-plugin-ts";
const vueConfig = require("../vue.config");

export default {
  input: "src/main.ts",
  output: {
    name: "VueBreakpoints",
    exports: "named",
    sourceMap: true,
    globals: vueConfig.configureWebpack.externals
  },
  external: Object.keys(vueConfig.configureWebpack.externals),
  plugins: [
    ts({ tsconfig: "tsconfig-build.json", browserslist: false }),
    sourcemaps(),
    commonjs()
  ]
};
