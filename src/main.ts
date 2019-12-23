import { Breakpoints } from "./breakpoints";
import Vue from "vue";
export * from "./breakpoints";

export function VueBreakpoints(
  vue: typeof Vue,
  options: { breakpoints?: string; addCssClasses?: boolean } = {}
) {
  vue.prototype.$break = new Breakpoints({
    propsData: options
  });
}
