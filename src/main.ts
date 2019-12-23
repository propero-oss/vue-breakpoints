import { Breakpoints } from "./breakpoints";
import Vue from "vue";

export function VueBreakpoints(
  vue: typeof Vue,
  options: { breakpoints?: string; addCssClasses?: boolean } = {}
) {
  vue.prototype.$break = new Breakpoints({
    propsData: options
  });
}

declare module "vue/types/vue" {
  interface Vue {
    $break: Breakpoints;
  }
}
